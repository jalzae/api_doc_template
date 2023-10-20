

function reInit(spec) {
  const ui = SwaggerUIBundle({
    spec: spec,
    dom_id: '#swagger-ui',
    deepLinking: true,
    presets: [
      SwaggerUIBundle.presets.apis,
      SwaggerUIStandalonePreset
    ],
    plugins: [
      SwaggerUIBundle.plugins.DownloadUrl
    ],
    layout: "StandaloneLayout"
  })
  window.ui = ui

  initFunction()
}

function filterAPI() {
  var searchInput = document.getElementById("searchInput").value.toLowerCase();
  if (searchInput == "") {
    reInit(spec)
    return false
  }

  var paths = {}
  for (var path in spec.paths) {
    if (path.toLowerCase().includes(searchInput)) {
      var pathData = spec.paths[path];

      paths[path] = pathData;
    }
  }

  var newSpec = {
    openapi: "3.0.1",
    info: {
      "title": "Result Search.."
    },
    paths: paths
  }

  reInit(newSpec)
}

function addMenuTabs() {
  const tabMenu = document.getElementById('tabMenu');
  const tabContent = document.getElementById('tabContent');
  const menu = spec.menu

  for (const key in menu) {
    const value = menu[key];
    tabMenu.innerHTML += `<li class="nav-item">
    <a class="nav-link" id="${key}-tab" data-toggle="tab" href="#${key}">${key.toUpperCase()}</a>
  </li>`

    tabContent.innerHTML += `<div class="tab-pane fade" id="${key}">
    ${value}
  </div>`
  }
}

function initFunction() {
  const sidebarElement = document.getElementById('sidebar');
  const opblockElements = document.getElementsByClassName('opblock');
  const previewCode = document.querySelector('.code-preview');

  for (let i = 0; i < opblockElements.length; i++) {
    opblockElements[i].addEventListener('click', function () {
      const completeId = opblockElements[i].id;
      console.log(completeId)
      sidebarElement.classList.remove('hidden');
      const pathElement = document.querySelector('#' + completeId + ' .opblock-summary-path a.nostyle span');
      const methodElement = document.querySelector('#' + completeId + ' .opblock-summary-method');
      const method = methodElement.textContent.trim().toLowerCase();
      const path = pathElement.textContent;
      var e = spec.paths[path][method].responses
      var code = spec.paths[path][method].code

      var count = 0;
      previewCode.innerHTML = ''
      previewCode.innerHTML += `<pre><code><p>${method} : ${path}</p></code></pre>`
      if (code) {
        previewCode.innerHTML += `<h3>Code</h3>
            <pre>
                <code class="language-javascript">
                  ${code}
                </code>
            </pre>
            `

      }
      for (const responseCode in e) {
        if (e[responseCode].expected) {
          previewCode.innerHTML += `
              
              <h3>${responseCode}</h3>
              <pre>
                <code class="language-javascript">
${e[responseCode].expected}
              </code>
              </pre>`
          count++
        }
      }

      if (count == 0) {
        sidebarElement.classList.add('hidden');
      }
    });
  }

}

window.onload = () => {
  reInit(spec);
};

addMenuTabs()
initFunction()