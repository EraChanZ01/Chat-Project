<h1 align="center"> Browser chat app </h1>

<h2>Application capabilities</h2>
<ul>
  <li>REST API server architecture is built</li>
  <li>Registration and authorization is performed using jwt token and all passwords are hashed via bcrypt</li>
  <li>The application uses WebSocket to make a direct connection between clients to receive messages in real time</li>
  <li>The application uses Next.js </li>
  <li>The application uses REDUX to store state in the global scope for all application components </li>
  <li>Uses Mongoose ORM to interact with MongoDB database</li>
  <li>Parts are isolated in Docker containers</li>
</ul>

<h3>Clone repositorie</h3>
<div class="highlight highlight-source-shell notranslate position-relative overflow-auto" dir="auto">
  <pre>  git clone https://github.com/EraChanZ01/Chat-Project.git</pre>
</div>
<p>OR</p>
<div class="highlight highlight-source-shell notranslate position-relative overflow-auto" dir="auto">
  <pre> git clone git@github.com:EraChanZ01/Chat-Project.git</pre>
</div>

<h3>Build Docker containers</h3>
<div class="highlight highlight-source-shell notranslate position-relative overflow-auto" dir="auto">
  <pre>docker compose --file docker-compose-dev.yaml up --build</pre>
</div>

# Chat-Project
