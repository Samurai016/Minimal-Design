import Clock from "./src/clock";
import Messaging from "./src/messaging";
import UI from "./src/ui";
import FileStore from "./src/fileStore";

UI.instance.restore();
Clock.run(FileStore.instance);
Messaging.run();