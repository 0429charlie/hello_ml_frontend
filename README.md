hello_ml_frontend
===
It is in React Native and can run on both Android and iOS. The project is an one page app that have the default welcome page from the initial react native app created using npx react-native init command. However, we added an API testing section at the end. It can serve as the reference on how to perform API call and send image back and forth from react native.<br>

API format
---
Investigating. To be updated.

Setup
---
1. Install Node, Python2, and JDK (run as admin)<br> 
choco install -y nodejs.install python2 jdk8<br>
2. Download Android Studio<br>
3. Install Android SDK<br>
Welcome Screen->Configure->SDK Manager->Android9(Pie)<br>
Show Package Details->Android SDK Platform 28 & Intel x86 Atom_64 System Image<br>
SDK Tools->Show Package Details->Android SDK Build-Tool->28.0.3<br>
4. Add ANDROID_HOME environment variable<br>
You can find the actual location of the SDK in the Android Studio "Preferences" dialog, under Appearance & Behavior → System Settings → Android SDK<br>
5. Add platform-tools to PATH variable<br>
Usually the platform-tool is C:\Android\tools\bin\platform-tools<br>
6. Create new virtual device<br>
Welcome Screen->Configure->AVD Manager<br>

Please visit https://reactnative.dev/docs/environment-setup for more or setup for Mac etc. Please do not refer to Expo CLI quickstart!!<br>

Dev Environment
---
This is a package created by IntelliJ. The project was then shared on Github by:
1. VCS->Import into Version Control->Share Project on Github<br>

Cloning this project into your dev environment
---
The following step shows how to clone this project in IntelliJ and start contribute to it.<br>
1. Create your own react native project. You can name it whatever but hello_ml_frontend is recommended :)<br>
2. Verify that your newly created project builds and run, especially if it run on emulator or not!! If not, please refer to the setup section above. You need your react native working before proceeding!!<br>
3. Set up git as following<br>
3.1 VCS->enable version control integration (click git when prompt)<br> 
3.2 VCS->Git->Remote->Add the GitHub repository with whatever name you want and url: https://github.com/0429charlie/hello_ml_frontend.git<br>
3.3 VCS->Git->Pull<br>
3.4 Right click project->Git->repository->branches->Remote->check out, then you will be prompt with an error message, click file there->Delete all file there<br>
3.5 Wait for the indexing to finish then repeat the above<br>
3.6 You will be prompt to do npm install. Do it as told<br>
3.7 Update the project (click merge all the incoming change)<br>

If you build and run, you might receive Error: EPERM. Please follow the install library step below.<br>
If you receive new error saying that the metro service is running from wrong place and need to be shutdown and reopen, please see the last section that say Metro service error at the end of this file.<br>

Install Library
---
1. Install React Native Image Picker (from the project root)<br>
npm i react-native-image-picker<br>
2. Linking Dependency<br>
react-native link react-native-image-picker<br>
cd android && gradlew clean<br>
3. Set camera permission for Android<br>
Project->android->app->src->main->AndroidManifest.xml<br>
Add the following (ignore if already there):
````
<uses-permission android:name="android.permission.CAMERA"/>
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>
````
4. Go back to the project root and install form-data<br>
npm install --save form-data<br>
5. Install axios<br>
npm install axios<br>
6. fund the project<br>
npm fund<br>

Metro Service Error
---
This error occur because the name of the project mismatch with the name of the project on GitHub. It can be fixed by changing the name and display name field in package.json, package-lock.json, and app.json file. Note that this will always occur when someone upload their version onto github with the project name different from yours and you update your project from github which is their committed version. Please modify these 3 files whenever it occur. Good practice is to have all contributors to name their project exactly the same locally as suggested in the cloning the project section above!!<br>
