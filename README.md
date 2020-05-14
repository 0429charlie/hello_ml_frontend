#hello_ml_frontend

Frontend for hello_ml project<br>
It is in React Native and can run on both Android and iOS

Setup
---
1. Install Node, Python2, and JDK (run as admin)<br> 
choco install -y nodejs.install python2 jdk8
2. Download Android Studio
3. Install Android SDK<br>
Welcome Screen->Configure->SDK Manager->Android9(Pie)<br>
Show Package Details->Android SDK Platform 28 & Intel x86 Atom_64 System Image<br>
SDK Tools->Show Package Details->Android SDK Build-Tool->28.0.3
4. Add ANDROID_HOME environment variable<br>
You can find the actual location of the SDK in the Android Studio "Preferences" dialog, under Appearance & Behavior → System Settings → Android SDK
5. Add platform-tools to PATH variable<br>
Usually the platform-tool is C:\Android\tools\bin\platform-tools
6. Create new virtual device<br>
Welcome Screen->Configure->AVD Manager

Please visit https://reactnative.dev/docs/environment-setup for more or setup for Mac etc.

Dev Environment
---
This is a package created by IntelliJ. The project was then shared on Github by:
1. VCS->Import into Version Control->Share Project on Github

Cloning this project into your dev environment
---
The following step shows how to clone this project in IntelliJ and start contribute to it
1. Create your own react native project. You can name it whatever but hello_ml_frontend is recommended :)
2. Verify that your newly created project builds and run, especially if it run on emulator or not!! If not, please refer to the setup section above. You need your react native working before proceeding!!
3. Set up git as following<br>
3.1 VCS->enable version control integration (click git when prompt)<br> 
3.2 VCS->Git->Remote->Add the GitHub repository with whatever name you want and url: https://github.com/0429charlie/hello_ml_frontend.git<br>
3.3 VCS->Git->Pull
3.4 Right click project->Git->repository->branches->Remote->check out, then you will be prompt with an error message, click file there->Delete all file there<br>
3.5 Then repeat the above and wait for the indexing to finish
3.6 Finally, update the project

Install Library
---
1. Install React Native Image Picker (from the project root)<br>
npm i react-native-image-picker<br>
or<br>
yarn add react-native-image-picker
2. Linking Dependency<br>
react-native link react-native-image-picker<br>
cd android && gradlew clean
3. Set camera permission for Android
Project->android->app->src->main->AndroidManifest.xml<br>
Add the following:
````
<uses-permission android:name="android.permission.CAMERA"/>
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>
````
4. Install form-data<br>
npm install --save form-data
5. Install axios<br>
npm install axios
