<h1 align='center'>SmartBrain Project 🧠<br>
Live Site: https://parkers-smartbrain.fly.dev/
</h1>

![face-detection-example](readme-imgs/sb-image-submit-ezgif.com-video-to-gif-converter.gif)

# Description
<p>A React app that detects and highlights faces in web images. Built with <strong>React.js</strong>, <strong>Node.js</strong>, <strong>Express</strong>, <strong>Bcrypt</strong>, <strong>PostgreSQL</strong>, <strong>Redis</strong>, <strong>JWT (session management)</strong>, <strong>AWS S3 + Lambda</strong>, <strong>Bootstrap</strong>, <strong>Tachyon CSS</strong>, and <strong>Clarifai Face Detection API</strong>, deployed on <strong>Fly.io</strong></p>

<h1>How to Use:</h1>
<p>Use the following test login information if you'd like to test the app without creating a new profile:
<br>
Email: <strong>a@gmail.com</strong>
<br>
Password: <strong>123</strong>
<br></p>

![sign-in-example](readme-imgs/sb-signin-ezgif.com-optimize.gif)<br>

**Please note: Site may take a few seconds to initially sign in due to Bcrypt password verification<br>

Or, you can register a new account. <strong>Note: please use test login info from above, to avoid overloading the database memory. Thanks!</strong><br>

![register](readme-imgs/sb-register.png)<br>

<p>Once logged in, copy and paste an image url from the web into the search input field, then click the 'Detect' button to run the Face Detection API</p>

![detect-button](readme-imgs/sb-image-submit-button-ezgif.com-video-to-gif-converter.gif)<br>

<p>Each time you upload an image, your entry count is increased by +1. You also get an emoji rank that changes with each image submission 😎</p>

![emoji-ranking](readme-imgs/sb-ranking.gif)

<p>You can also view and update your profile information</p>

![profile-view](readme-imgs/sb-profile-view-ezgif.com-video-to-gif-converter.gif)

<p>Including your profile picture!</p>

![profile-pic-update](readme-imgs/update-profile-pic.gif)

## Features
<li>Multi-Face Detection using Clarifai Face Detection API Model
</li>
<br>
<img src='readme-imgs/sb-faces-detected.png'>
<li>User profiles, stored with a PostgreSQL Database, hosted on Fly.io
</li>
<br>
<img src='readme-imgs/sb-db.png'>
<li>JWT session management, with tokens stored in Redis temporarily
</li>
<br>
<img src='readme-imgs/sb-jwt-redis.png'>
<li>Tokens removed during sign-out, so re-authentication is required
</li>
<br>
<img src='readme-imgs/sb-sign-out.gif' style="width: 35rem;">
<li>Responsive layout using Flexbox
</li>
<br>
<img src='readme-imgs/sb-flexbox.png' style="width: 35rem;">
<li>TS Particles for background animation
</li>
<br>
<img src='readme-imgs/sb-particles2-ezgif.com-video-to-gif-converter.gif' style="width: 27rem;">
<li>Parallax Tilt for interactive site logo
</li>
<br>
<img src='readme-imgs/sb-parallax.gif'>
<li>Form Validation & Error Messages
</li>
<br>
<img src='readme-imgs/sb-validation.png'>
<img src='readme-imgs/sb-form.png' style="width: 45rem;">
<img src='readme-imgs/sb-tree.png' style="width: 45rem;">
<li>Custom site favicon
</li>
<br>
<img src='public/favicon.ico' height='200' width='200'>
<li>Bcrypt user password encryption/decryption to/from PostgreSQL/Fly.io Database
</li>
<br>
<img src='readme-imgs/sb-bcrypt.png'>
<li>Mobile-friendly
</li>
<br>
<img src='readme-imgs/sb-mobile.gif.gif'>

<h3>Technical challenges I overcame:</h3>
<li>With Clarifai REST API integration, had numerous issues with outdated code and documentation. Was also able to instruct Clarifai model to detect multiple faces, not just one</li>
<li>Troubleshooted with free hosting services for server, databases, and front-end app deployment</li>
<li>Resolved numerous issues related to using a Windows OS vs Mac (i.e. PATH errors)</li>
<li>Moved API calls from front-end to back-end for security</li>
<li>Setting up ENV variables properly on the server for both local development and production</li>
<li>Learned several new technologies: Node.js, Express, Bcrypt, PostgreSQL, Redis, Docker, AWS, JWT, Knex.js</li>
<li>Challenged myself by using ES6+ syntax for Node.js (Back-end is 100% ES6+ syntax)</li>

<h3>Possible Future Improvements:</h3>
<li>Store submitted images in a gallery view</li>
<li>Allow users to upload local images for face detection API</li>
<li>Display a loading spinner while logging in</li>


<h1><a href='https://github.com/ProfoundlyParker/SmartBrain--front-end'>View Back-End Repository</a></h1>

  
