/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import ImagePicker from 'react-native-image-picker';

import axios from 'axios';
import FormData from 'form-data';

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      file: null,
      label: 'wefjwelkfj',
    };
    this.chooseFile = this.chooseFile.bind(this);
    this.snedRequest = this.snedRequest.bind(this);
  }

  chooseFile() {
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
      console.log('Response = ', response);
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        this.setState({
          file: response,
        });
      }
    });
  }

  async snedRequest() {
    const formData = new FormData();
    formData.append('photo', this.state.file);
    // When testing on local host, use the format http://[local ip]:port/ where [local ip] can be acquired by typing ipconfig in command prompt
    await axios
      //.post('http://10.0.0.134:80/predict', {formData})
      .post('https://hello-ml-4pv5qti4qa-uw.a.run.app/predict', {formData})
      //.post('https://hello-ml-4pv5qti4qa-uw.a.run.app/predict', {
      .then(res => {
        this.setState({
          label: res.data,
        });
      });
    /*
    console.log('fetching');
    try {
      let res = await fetch(
        'https://hello-ml-4pv5qti4qa-uw.a.run.app/predict',
        {
          method: 'POST',
          body: formData,
        },
      );
      let responseJason = await res.json();
      console.log('Success');
      console.log(responseJason.text);
    } catch (err) {
      console.log('Some thing went wrong...');
      console.log(JSON.stringify(err));
      throw err;
    }
     */
  }

  render() {
    return (
      <View>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <Header />
            {global.HermesInternal == null ? null : (
              <View style={styles.engine}>
                <Text style={styles.footer}>Engine: Hermes</Text>
              </View>
            )}
            <View style={styles.body}>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Step One</Text>
                <Text style={styles.sectionDescription}>
                  Edit <Text style={styles.highlight}>App.js</Text> to change
                  this screen and then come back to see your edits.
                </Text>
              </View>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>See Your Changes</Text>
                <Text style={styles.sectionDescription}>
                  <ReloadInstructions />
                </Text>
              </View>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Debug</Text>
                <Text style={styles.sectionDescription}>
                  <DebugInstructions />
                </Text>
              </View>
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Learn More</Text>
                <Text style={styles.sectionDescription}>
                  Read the docs to discover what to do next:
                </Text>
              </View>
              <LearnMoreLinks />
              <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>API test</Text>
                <TouchableOpacity>
                  <Text
                    styles={styles.sectionDescription}
                    onPress={this.chooseFile}>
                    Select image
                  </Text>
                </TouchableOpacity>
                {this.state.file && (
                  <Image
                    source={{
                      // inline if-else statement
                      uri: this.state.file.uri,
                    }}
                    style={styles.img_dimension}
                  />
                )}
                <TouchableOpacity>
                  <Text
                    styles={styles.sectionDescription}
                    onPress={this.snedRequest}>
                    Send Request
                  </Text>
                </TouchableOpacity>
                <Text>{this.state.label}</Text>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
  img_dimension: {
    width: 50,
    height: 50,
  },
});

export default App;
