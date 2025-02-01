window.addEventListener("hashchange", loadContent);
document.addEventListener("DOMContentLoaded", loadContent);

async function loadContent() {
    const hash = window.location.hash.substring(1);
    const parts = hash.split("/").filter(p => p);
    
    if (parts.length < 2) return;

    const type = parts[0];
    const id = parts[1];

    const filePath = `/${type}/${id}/data.json`;

    try {
        const response = await fetch(filePath);
        if (!response.ok) throw new Error("File not found.");
        const data = await response.json();
        displayContent(data, type);
    } catch (error) {
        console.error("There was some error.");
    }
}

function displayContent(data, type) {
    if (type == "projects") {
        document.getElementById("title").textContent = data.title;
        document.getElementById("description").innerHTML = data.description;
        const imgUrls = data.images;

        let index = 0;

        const imageWrapper = document.createElement("div");
        imageWrapper.classList.add("image-wrapper");
        document.body.appendChild(imageWrapper);

        const caption = document.createElement("p");
        caption.innerHTML = `<strong>${index + 1} / ${imgUrls.length}</strong>`
        imageWrapper.appendChild(caption)

        const imageContainer = document.createElement("div");
        imageContainer.classList.add("image-container");
        imageWrapper.appendChild(imageContainer);

        const imgElement = document.createElement("img");
        imgElement.src = imgUrls[index];
        imageContainer.appendChild(imgElement);
        
        const buttonsContainer = document.createElement("div");
        buttonsContainer.classList.add("buttons-container");
        imageWrapper.appendChild(buttonsContainer);

        const leftButton = document.createElement("button");
        leftButton.textContent = "<";
        leftButton.id = "leftButton"
        leftButton.classList.add("leftButton");
        buttonsContainer.appendChild(leftButton);
        
        const rightButton = document.createElement("button");
        rightButton.textContent = ">";
        rightButton.id = "rightButton"
        rightButton.classList.add("rightButton");
        buttonsContainer.appendChild(rightButton);

        leftButton.addEventListener("click", () => {
            index -= 1;
            if (index < 0) index = imgUrls.length - 1;
            imgElement.src = imgUrls[index];
            caption.innerHTML = `<strong>${index + 1} / ${imgUrls.length}</strong>`
        });
        
        rightButton.addEventListener("click", () => {
            index += 1;
            if (index >= imgUrls.length) index = 0;
            imgElement.src = imgUrls[index];
            caption.innerHTML = `<strong>${index + 1} / ${imgUrls.length}</strong>`
        });
    }
    else {
        if (type == "articles") {
            document.getElementById("title").textContent = data.title;
            document.getElementById("content").innerHTML = data.content;
        }
    }
}