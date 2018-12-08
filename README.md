# Ductv
A cross-platform collaborative calendar that takes into account decencies of tasks.

Emory University 
CS 370 - Fall 2018
Dorian Arnold
THIS CODE IS OUR OWN WORK, IT WAS WRITTEN WITHOUT CONSULTING
A TUTOR OR CODE WRITTEN BY OTHER STUDENTS OUTSIDE OF OUR TEAM.
- Bryan Deleon-Vargas, Nandar Soe, Jonathon Gomez, Alvin Choi, Sage Ono, Yibo Wang

App built in woof directory with react native
Django API is in prod directory

Instructions(Run on Android):
1. To run our app, open the Ductv.zip folder in the directory of your choice
2. Install android studio & set up an emulator SDK (we tested with Android Studio 6.0 - Marshmallow)
3. Go to android studio start page and select "open and existing project and open project in {path to Ductv}/Ductv/woof/android/"
4. Open terminal on android studio, and run:  /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
5. Run "brew install node" to install npm and node
Might need to overwrite node
6. Run "node -v" and "npm -v" to make sure they are installed (will display versions)
For more troubleshooting, visit https://www.dyclassroom.com/howto-mac/how-to-install-nodejs-and-npm-on-mac-using-homebrew
7. Run "sudo npm install && sudo npm run update-android"

Instructions (Run iOS in Webstorm):
1. To run our app, open the Ductv.zip folder in the directory of your choice
2. Make sure you have a React Native CLI installed on your machine. 
2. Run the following command in your Terminal: npm install -g react-native-cli.
3. In Run main menu, choose Edit Configurations. Then in Run/Debug Configurations dialog that oppens, press + (Alt + Insert), select React Native from the list.
4. Open terminal and change directory to Ductv/woof and run: npm install (usually need to run this command twice for Metro Bundler to launch )
5. Run command: react-native run-ios
