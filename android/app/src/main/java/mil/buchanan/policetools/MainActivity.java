package mil.buchanan.policetools;

import android.os.Bundle;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {

    @Override
    public void onCreate(Bundle savedInstanceState) {
        // Los plugins propios se registran antes de que el puente arranque:
        // despues, registerPlugin ya no llega a tiempo y el JS se encuentra
        // con que MailOut no existe.
        registerPlugin(MailOut.class);
        super.onCreate(savedInstanceState);
    }
}
