function openSidebar() {
  document.getElementById("sidebar-flying").style.width = "35%";
  document.getElementById("sidebar").classList.add('hidden');
}

function closeSidebar() {
  document.getElementById("sidebar-flying").style.width = "0";
}

document.getElementById("flyout-button").addEventListener("click", openSidebar);

function generateOperationId(summary, tags) {
  // Modify this logic to suit your specific requirements
  // Here, we are using tags to generate the operationId
  // You can customize this logic as needed
  const tagPart = tags.join('-').replace(/[^a-zA-Z0-9-]/g, '-');
  const summaryPart = summary.replace(/[^a-zA-Z0-9-]/g, '_');

  return `operations-${tagPart}-${summaryPart}`;
}

function generateMenu(data) {
  const menu = document.getElementById("sidebar-menu");

  // Create an object to group methods by operationId
  const groupedMethods = {};

  for (const path in data.paths) {
    const pathData = data.paths[path];
    const methods = Object.keys(pathData);

    methods.forEach((method) => {
      const methodData = pathData[method];
      const tags = methodData.tags;
      const summary = methodData.summary;

      // Generate operationId based on tags and summary
      const operationId = generateOperationId(summary, tags);

      // Create the methodItem and add it to the corresponding group
      const methodItem = document.createElement("li");
      methodItem.innerHTML = `<a href="#${operationId}"><p>Route : ${path}</p><p>${method.toUpperCase()}: ${methodData.summary}</p></a>`;

      if (!groupedMethods[operationId]) {
        groupedMethods[operationId] = [];
      }
      groupedMethods[operationId].push(methodItem);
    });
  }

  // Iterate through the grouped methods and create menu items
  for (const operationId in groupedMethods) {
    const groupItems = groupedMethods[operationId];
    const groupItem = document.createElement("li");
    groupItem.classList.add('parent');
    groupItem.innerText = `${operationId.replace('operations-', '')}`;

    const subMenu = document.createElement("ul");
    groupItems.forEach((methodItem) => {
      subMenu.appendChild(methodItem);
    });

    groupItem.appendChild(subMenu);
    menu.appendChild(groupItem);
  }
}


function filterAPIFlying() {
  const searchInput = document.getElementById("searchInputFlying");
  const searchText = searchInput.value.toLowerCase();

  const menu = document.getElementById("sidebar-menu");
  const items = menu.getElementsByTagName("li");

  for (let i = 0; i < items.length; i++) {
    const item = items[i];
    const text = item.textContent.toLowerCase();

    if (text.includes(searchText)) {
      item.style.display = "block";
    } else {
      item.style.display = "none";
    }
  }
}

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
      "version": "1.0.0",
      "title": "Result Search.."
    },
    servers: spec.servers,
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
${JSON.stringify(e[responseCode].expected)}
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
  generateMenu(spec)
};

addMenuTabs()
initFunction()