hello_ml_frontend
===
It is in React Native and can run on both Android and iOS. The project is an one page app that have the default welcome page from the initial react native app created using npx react-native init command. However, we added an API testing section at the end. It can serve as the reference on how to perform API call and send image back and forth from react native.<br>

API format
---
we use react-native-image-picker library for picking the image. The image picker is call as following.<br>
```
let options = {
    title: 'Select Image',
    customButtons: [
        {name: 'customOptionKey', title: 'Choose Photo from Custom Option'},
    ],
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};
ImagePicker.showImagePicker(options, response => {
    if (response.didCancel) {
        console.log('User cancelled image picker');
    } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
    } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
    } else {
        console.log(response);
    }
});
```
the response is then in the form of:<br>
```
 {"data": base64 string,"fileName": string,"fileSize": int,"height": int,"isVertical": bool,"orininalRotation": 0,"path": string,"timestamp": DateTime,"type": string,"uri": string,"width": int}<br>
```
Next, this response is then encoded with formData as follow (note that response is the same response as above)<br>
```
import FormData from 'form-data';
const formData = new FormData();
formData.append('photo', response);
```
Then sent to the server using axio<br>
```
import axios from 'axios';
await axios
    .post('API_url', {formData})
    .then(res => {
        console.log(res.data);
    });
```
Note that API_url is the endpoint that you want to send the request to. If testing locally, please use http://[local ip]:port/ where [local ip] can be acquired by typing ipconfig in command prompt<br>

In the server side, we get request which is in the from of:<br>
```
{'formData': {'_parts': [['photo', {'height': int, 'width': int, 'type': string, 'fileName': string, 'path': string, 'fileSize': int, 'data': base63 string, 'uri': string, 'isVertical': bool, 'originalRotation': int, 'timestamp': DateTime}]]}}
```
Note that it start with the key 'formData' then '_parts'. Inside the '_parts', we get a list where each element is a tuple generated from each formData.append(key, value) call. In this case, we only called formData.append('photo', response) once so we only have 1 element with first of tuple to be the key 'photo' and second is the response that we get from the image-picker library (the order of the key in the response might be different after encoding with formData but the content are the same).<br>

The server than return a string indicating the label which can be access by res.data (see the then statement at axio call above).<br>

*When using this as template for other project, consider sending the information needed only when encode with the formData. For example, server should not care about the path to the image on the edge device thus 'path' field is not needed


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
If you receive new error saying that the metro server is running from wrong place and need to be stop and restart, please see the last section that say Metro service error at the end of this file.<br>

Install Library
---
1. Install React Native Image Picker (run in IntelliJ terminal from the project root)<br>
    ```
    npm install react-native-image-picker --save
    ```
    or (if you want a specific version)<br>
    ```
    npm install react-native-image-picker@1.1.0 --save
    ```
2. Linking Dependency<br>
    ```
    react-native link react-native-image-picker
    cd android && gradlew clean
    cd ..
    cd ios
    pod install
    cd ..
    ```
3. Set camera permission for Android<br>
Project->android->app->src->main->AndroidManifest.xml<br>
Add the following (ignore if already there):
    ````
    <uses-permission android:name="android.permission.CAMERA"/>
    <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"/>
    ````
4. Stop your Packager or Bundler and re-run it again
    ```
    npm start --rest-cache
    ```
5. Modify the Info.plist under the path: ios/[Your Local Porject Name]/Images.xcasseets/ and look for “Info.plist” and add the following code after the dictionary tag<br>
    ```
        <string>$HELLOML would like access to your photo gallery</string>
        <key>NSCameraUsageDescription</key>
        <string>$HELLOML would like to use your camera</string>
        <key>NSPhotoLibraryAddUsageDescription</key>
        <string>$HELLOML would like to save photos to your photo gallery</string>
        <key>NSMicrophoneUsageDescription</key>
        <string>$(HELLOML would like to use your microphone (for videos)</string>
    ```
   Note that $HELLOML can be replaced by whatever app name you want the app to show when prompting the user to gain permission.
6. install form-data (make sure you are at the project root)<br>
    ```
    npm install --save form-data<br>
    ```
7. Install axios<br>
    ```
    npm install axios<br>
    ```
8. fund the project<br>
    ```
    npm fund<br>
    ```

Metro Service Error
---
This error occur because the name of the project mismatch with the name of the project on GitHub. It can be fixed by changing the name and display name field in package.json, package-lock.json, and app.json file. Note that this will always occur when someone upload their version onto github with the project name different from yours and you update your project from github which is their committed version. Please modify these 3 files whenever it occur. Good practice is to have all contributors to name their project exactly the same locally as suggested in the cloning the project section above!!<br>
