package mil.buchanan.policetools;

import android.content.ActivityNotFoundException;
import android.content.ClipData;
import android.content.Intent;
import android.net.Uri;

import androidx.core.content.FileProvider;

import com.getcapacitor.JSArray;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

/**
 * Correo con destinatario y con adjuntos.
 *
 * El plugin Share de Capacitor no tiene destinatario: manda titulo, texto y
 * ficheros al selector de Android y nada mas. Por eso el correo se abria en
 * Gmail con los PDFs puestos y el campo Para en blanco, aunque en Ajustes
 * hubiera una direccion guardada — la direccion no tenia por donde llegar.
 *
 * Y mailto:, que si lleva destinatario, no admite adjuntos. Ninguna de las
 * dos vias sirve sola.
 *
 * La que si sirve es un ACTION_SEND con un selector ACTION_SENDTO mailto:.
 * El selector es lo que hace el truco doble: deja en el elenco solo las
 * aplicaciones de correo —fuera WhatsApp, Drive y el resto, que para mandar
 * un parte no pintan nada— y ademas es lo que hace que Gmail lea el
 * EXTRA_EMAIL en vez de ignorarlo. Los adjuntos viajan aparte, en el
 * EXTRA_STREAM del intent de fuera.
 */
@CapacitorPlugin(name = "MailOut")
public class MailOut extends Plugin {

    @PluginMethod
    public void send(PluginCall call) {
        try {
            String[] para = direcciones(call.getArray("to"));
            String[] copia = direcciones(call.getArray("cc"));

            ArrayList<Uri> uris = new ArrayList<>();
            JSArray ficheros = call.getArray("files");
            if (ficheros != null) {
                for (Object o : ficheros.toList()) {
                    Uri u = comoContenido(String.valueOf(o));
                    if (u != null) uris.add(u);
                }
            }

            if (uris.isEmpty()) {
                call.reject("Sin ficheros que adjuntar");
                return;
            }

            Intent envio = new Intent(uris.size() > 1
                    ? Intent.ACTION_SEND_MULTIPLE
                    : Intent.ACTION_SEND);
            envio.setType("application/pdf");

            if (para.length > 0) envio.putExtra(Intent.EXTRA_EMAIL, para);
            if (copia.length > 0) envio.putExtra(Intent.EXTRA_CC, copia);
            envio.putExtra(Intent.EXTRA_SUBJECT, call.getString("subject", ""));
            envio.putExtra(Intent.EXTRA_TEXT, call.getString("body", ""));

            if (uris.size() > 1) {
                envio.putParcelableArrayListExtra(Intent.EXTRA_STREAM, uris);
            } else {
                envio.putExtra(Intent.EXTRA_STREAM, uris.get(0));
            }

            // El permiso de lectura viaja con el flag, pero solo alcanza a las
            // URIs que esten en el ClipData. Sin esto Gmail recibe el adjunto
            // y no puede abrirlo: sale "no se pudo adjuntar el archivo".
            ClipData clip = ClipData.newUri(getContext().getContentResolver(), "PDF", uris.get(0));
            for (int i = 1; i < uris.size(); i++) {
                clip.addItem(new ClipData.Item(uris.get(i)));
            }
            envio.setClipData(clip);
            envio.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);

            JSObject res = new JSObject();
            res.put("cantidad", uris.size());

            try {
                // Con selector: solo aplicaciones de correo, y con el Para puesto
                Intent soloCorreo = new Intent(Intent.ACTION_SENDTO, Uri.parse("mailto:"));
                envio.setSelector(soloCorreo);
                getActivity().startActivity(envio);
                res.put("via", "correo");
            } catch (ActivityNotFoundException e) {
                // Sin ninguna app de correo instalada, mejor el selector normal
                // que un error: el oficial sigue pudiendo mandar el parte por
                // donde tenga. El destinatario se queda en el intento por si
                // la aplicacion elegida sabe leerlo.
                envio.setSelector(null);
                getActivity().startActivity(
                        Intent.createChooser(envio, "Send documents"));
                res.put("via", "selector");
            }

            call.resolve(res);
        } catch (Exception e) {
            call.reject(e.getMessage() != null ? e.getMessage() : "No se pudo abrir el correo", e);
        }
    }

    private String[] direcciones(JSArray lista) {
        List<String> fuera = new ArrayList<>();
        if (lista != null) {
            for (Object o : lista.toList()) {
                String s = String.valueOf(o).trim();
                if (!s.isEmpty()) fuera.add(s);
            }
        }
        return fuera.toArray(new String[0]);
    }

    /**
     * Ruta o file:// -> content://
     *
     * Android no acepta un file:// de otra aplicacion desde hace anos: lanza
     * FileUriExposedException. Tiene que salir del FileProvider, que es el que
     * concede el permiso de lectura al que reciba el intent.
     */
    private Uri comoContenido(String ruta) {
        if (ruta == null || ruta.isEmpty()) return null;

        if (ruta.startsWith("content://")) return Uri.parse(ruta);

        String limpia = ruta.startsWith("file://") ? Uri.parse(ruta).getPath() : ruta;
        if (limpia == null) return null;

        File f = new File(limpia);
        if (!f.exists()) return null;

        return FileProvider.getUriForFile(
                getContext(), getContext().getPackageName() + ".fileprovider", f);
    }
}
