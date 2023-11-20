document.addEventListener("DOMContentLoaded", function () {
    // Apply styles based on the current page
    const url = window.location.pathname;

    const dashboardNavLinks = document.querySelectorAll(".dashboard-nav-item");

    dashboardNavLinks.forEach(link => {
        if (link.getAttribute("href") === url) {
            link.style.backgroundColor = "rgba(12, 62, 187, 0.1)";
        }
    });

    const homeNavLinks = document.querySelectorAll(".home-nav-link");

    homeNavLinks.forEach(link => {
        if (link.getAttribute("href") === url) {
            link.classList.add("active");
        }
    });

    // Dashboard navbar toggle in 991 wide screen
    if (window.innerWidth > 991) {
        const menuToggle = document.getElementById("toggle-sidebar");
        const sidebarWrapper = document.getElementById("sidebar-wrapper");
        const sidebarTexts = document.querySelectorAll(".sidebar-text");
        const createBtn = document.getElementById("create-url");
        const mainContent = document.getElementById("main-content");

        let sidebarCollapsed = localStorage.getItem("sidebarCollapsed") === "true";

        function toggleSidebar() {
            if (sidebarCollapsed === false) {
                sidebarWrapper.style.width = "80px";
                mainContent.style.marginLeft = "80px";
    
                createBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512" style="position:relative; top: -2px;"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" style="fill:#ffffff"/></svg>';
    
                sidebarTexts.forEach(text => text.classList.add("d-none"));
            } else if (sidebarCollapsed === true) {
                sidebarWrapper.style.width = "240px";
                mainContent.style.marginLeft = "240px";
    
                setTimeout(function () {
                    createBtn.innerHTML = "Create a new URL";
                    sidebarTexts.forEach(text => text.classList.remove("d-none"));
                }, 160);
            }
    
            sidebarWrapper.classList.toggle("collapsed");
            
        }

        menuToggle.addEventListener("click", () => {
            sidebarCollapsed = !sidebarCollapsed;
            localStorage.setItem("sidebarCollapsed", sidebarCollapsed.toString()); 
            toggleSidebar();   
        });
    }

    if (window.innerWidth <= 991 && window.innerWidth > 767) {
        const mainContent = document.getElementById("main-content");
        mainContent.style.marginLeft = "85px";
    }

    if (window.innerWidth <= 767) {
        const mainContent = document.getElementById("main-content");
        mainContent.style.marginLeft = "0";

        // The search btn
        const smallScreenSearchbar = document.getElementById("smallScreenSearchBar");
        const smallScreenSearchBtn = document.getElementById("smallScreenSearchBtn");
       
        smallScreenSearchBtn.addEventListener("click", function() {
            document.getElementById("smallSidebarToggleBtnDiv").style.display = "none";
            document.getElementById("smallScreenSearchBtnDiv").style.display = "none";
            document.getElementById("smallScreenGithubDiv").style.display = "none";
            document.getElementById("smScreenUserInfoDiv").style.display = "none";
            document.getElementById("smScreenLogo").style.display = "none";
            smallScreenSearchbar.style.display = "block";
        });

        // The cancel search btn
        const cancelSearchBtn = document.getElementById("cancelSearchBtn");
        cancelSearchBtn.addEventListener("click", function() {
            smallScreenSearchbar.style.display = "none";
            document.getElementById("smallSidebarToggleBtnDiv").style.display = "block";
            document.getElementById("smallScreenSearchBtnDiv").style.display = "block";
            document.getElementById("smallScreenGithubDiv").style.display = "block";
            document.getElementById("smScreenUserInfoDiv").style.display = "block";
            document.getElementById("smScreenLogo").style.display = "block";
        });
        
        // The small screen sidebar
        const smScreenToggleSidebarBtn = document.getElementById("smallToggleSidebarBtn");
        const smScreenSidebar = document.getElementById("sm-screen-sidebar");

        smScreenToggleSidebarBtn.addEventListener("click", function() {
            smScreenSidebar.style.display = "block";
        });

        // Uncollapse sidebar if the uncollapse button is clicked
        document.getElementById("sm-uncollapse-sidebar").addEventListener("click", function() {
            smScreenSidebar.style.display = "none";
        });
    }

    // When window is resized adjust the styles based on the width
    window.addEventListener("resize", function() {
        if (window.innerWidth > 991) {
            const menuToggle = document.getElementById("toggle-sidebar");
            const sidebarWrapper = document.getElementById("sidebar-wrapper");
            const sidebarTexts = document.querySelectorAll(".sidebar-text");
            const createBtn = document.getElementById("create-url");
            const mainContent = document.getElementById("main-content");
    
            let sidebarCollapsed = localStorage.getItem("sidebarCollapsed") === "true";
    
            function toggleSidebar() {
                if (sidebarCollapsed === false) {
                    sidebarWrapper.style.width = "80px";
                    mainContent.style.marginLeft = "80px";
        
                    createBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 448 512" style="position:relative; top: -2px;"><path d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z" style="fill:#ffffff"/></svg>';
        
                    sidebarTexts.forEach(text => text.classList.add("d-none"));
                } else if (sidebarCollapsed === true) {
                    sidebarWrapper.style.width = "240px";
                    mainContent.style.marginLeft = "240px";
        
                    setTimeout(function () {
                        createBtn.innerHTML = "Create a new URL";
                        sidebarTexts.forEach(text => text.classList.remove("d-none"));
                    }, 160);
                }
        
                sidebarWrapper.classList.toggle("collapsed");
                
            }

            toggleSidebar();
    
            menuToggle.addEventListener("click", () => {
                sidebarCollapsed = !sidebarCollapsed;
                localStorage.setItem("sidebarCollapsed", sidebarCollapsed.toString()); 
                toggleSidebar();   
            });
        }
        if (window.innerWidth <= 991 && window.innerWidth > 767) {
            const mainContent = document.getElementById("main-content");
            mainContent.style.marginLeft = "85px";
        }
    
        if (window.innerWidth <= 767) {
            const mainContent = document.getElementById("main-content");
            mainContent.style.marginLeft = "0";

            const sidebarTexts = document.querySelectorAll(".sidebar-text");
            sidebarTexts.forEach((text => text.classList.remove("d-none")));

            // The search btn
            const smallScreenSearchbar = document.getElementById("smallScreenSearchBar");
            const smallScreenSearchBtn = document.getElementById("smallScreenSearchBtn");
        
            smallScreenSearchBtn.addEventListener("click", function() {
                document.getElementById("smallSidebarToggleBtnDiv").style.display = "none";
                document.getElementById("smallScreenSearchBtnDiv").style.display = "none";
                document.getElementById("smallScreenGithubDiv").style.display = "none";
                document.getElementById("smScreenUserInfoDiv").style.display = "none";
                document.getElementById("smScreenLogo").style.display = "none";
                smallScreenSearchbar.style.display = "block";
            });

            // The cancel search btn
            const cancelSearchBtn = document.getElementById("cancelSearchBtn");
            cancelSearchBtn.addEventListener("click", function() {
                smallScreenSearchbar.style.display = "none";
                document.getElementById("smallSidebarToggleBtnDiv").style.display = "block";
                document.getElementById("smallScreenSearchBtnDiv").style.display = "block";
                document.getElementById("smallScreenGithubDiv").style.display = "block";
                document.getElementById("smScreenUserInfoDiv").style.display = "block";
                document.getElementById("smScreenLogo").style.display = "block";
            });
            
            // The small screen sidebar
            const smScreenToggleSidebarBtn = document.getElementById("smallToggleSidebarBtn");
            const smScreenSidebar = document.getElementById("sm-screen-sidebar");

            smScreenToggleSidebarBtn.addEventListener("click", function() {
                smScreenSidebar.style.display = "block";
            });

            // Uncollapse sidebar if the uncollapse button is clicked
            document.getElementById("sm-uncollapse-sidebar").addEventListener("click", function() {
                smScreenSidebar.style.display = "none";
            });
        }
    })

    // Copy buttons event listener
    document.querySelectorAll(".copy-btn").forEach(btn => {
        btn.addEventListener("click", (event) => {
            const text = `${event.target.dataset.url}`;
            navigator.clipboard.writeText(text);

            event.target.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" height="1.5rem" style="fill: white;"><!--! Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M280 64h40c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128C0 92.7 28.7 64 64 64h40 9.6C121 27.5 153.3 0 192 0s71 27.5 78.4 64H280zM64 112c-8.8 0-16 7.2-16 16V448c0 8.8 7.2 16 16 16H320c8.8 0 16-7.2 16-16V128c0-8.8-7.2-16-16-16H304v24c0 13.3-10.7 24-24 24H192 104c-13.3 0-24-10.7-24-24V112H64zm128-8a24 24 0 1 0 0-48 24 24 0 1 0 0 48z"/></svg> Copied';

            setTimeout(function() {
                event.target.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" height="1.5rem" style="fill: white;"><!--! Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M280 64h40c35.3 0 64 28.7 64 64V448c0 35.3-28.7 64-64 64H64c-35.3 0-64-28.7-64-64V128C0 92.7 28.7 64 64 64h40 9.6C121 27.5 153.3 0 192 0s71 27.5 78.4 64H280zM64 112c-8.8 0-16 7.2-16 16V448c0 8.8 7.2 16 16 16H320c8.8 0 16-7.2 16-16V128c0-8.8-7.2-16-16-16H304v24c0 13.3-10.7 24-24 24H192 104c-13.3 0-24-10.7-24-24V112H64zm128-8a24 24 0 1 0 0-48 24 24 0 1 0 0 48z"/></svg> Copy';
            }, 3000);
        })
    })

    // The save changes button event listener
    document.querySelectorAll(".save-changes").forEach(btn => {
        btn.addEventListener("click", function() {
            const oldShortenedCode = this.getAttribute("data-url");

            if (document.getElementById("domain" + oldShortenedCode).value !== window.location.host) {
                displayErrorMessage("Currently only our domain is available.");
                return;
            }
              
            const title = document.getElementById("title" + oldShortenedCode);
            const alias = document.getElementById("alias" + oldShortenedCode);
            const apiUrl = window.location.protocol + "//" + window.location.host + "/" + "api/update/" + oldShortenedCode;

            const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
            const headers = {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken,
            };

            fetch(apiUrl, {
                method: "PUT",
                headers: headers,
                body: JSON.stringify({
                  title: title.value,
                  shortened_code: alias.value
                })
            })
            .then(response => {
                if (!response.ok) {
                throw new Error(`Http error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (window.location.pathname === `/links/${oldShortenedCode}/` && oldShortenedCode !== alias.value) {
                    window.location.replace(window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + "/links/" + alias.value + "/");
                }
                else if (window.location.pathname === `/links/${oldShortenedCode}/` && oldShortenedCode === alias.value) {
                    window.location.reload();
                }
                else {
                    document.getElementById("title-" + this.getAttribute("data-title")).innerHTML = `<strong>${title.value}</strong>`;
                    console.log(true);
                    document.getElementById("shortened-url-" + oldShortenedCode).innerHTML = `<strong>${window.location.host + "/" + alias.value}</strong>`;

                    document.getElementById("a-" + oldShortenedCode).href = alias.value;

                    // Set the copy btn data attribute to the new url
                    document.getElementById("copy-" + oldShortenedCode).dataset.url = window.location.host + "/" + alias.value;

                    // Update the edit button's data
                    document.querySelector("#edit-" + oldShortenedCode).dataset.urltitle = title.value;
                    document.querySelector("#edit-" + oldShortenedCode).dataset.urlcode = alias.value;

                    // Update the delete modal data
                    document.getElementById("deleteModal" + oldShortenedCode).id = "deleteModal" + alias.value;
                    document.getElementById("deleteBtn" + oldShortenedCode).id = "deleteBtn" + alias.value;
                    document.getElementById("deleteBtn" + alias.value).setAttribute("data-bs-target", "#deleteModal" + alias.value);
                    document.getElementById("deleteBtn" + oldShortenedCode).setAttribute("data-code", alias.value);
                    
                    // Toast
                    showToast("Updated the details successfully.");
                }
            })
            .catch(error => {
                console.error("Error updating: " + error);
                showToast("An error occurred while updating. Please try again.");
            });
              
        });
    });

    // The delete button event listener
    document.querySelectorAll(".delete-btn").forEach(btn => {
        btn.addEventListener("click", function() {
            const code = this.getAttribute("data-code");
            const deleteApiUrl = window.location.protocol + "//" + window.location.host + "/" + "api/delete/" + code;

            const csrftoken = document.querySelector("[name=csrfmiddlewaretoken]").value;
            const headers = {
            'Content-Type': 'application/json',
            'X-CSRFToken': csrftoken,
            };

            fetch(deleteApiUrl, {
                method: "DELETE",
                headers: headers,
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Http error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (window.location.pathname === `/links/${code}/`) {
                    window.location.replace(window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + "/links/");
                }
                else if (window.location.pathname === "/links/") {
                    document.getElementById("div" + code).remove();
                    console.log(document.getElementById("div" + code));
                    showToast("Deleted successfully.");
                }
            })
            .catch(error => {
                showToast("An error occurred while deleting. Please try again.");
            });
              
        });
    });
    
    const editBtn = document.querySelectorAll(".edit-btn");
    editBtn.forEach(btn => {
        btn.addEventListener("click", function() {
            const title = this.getAttribute("data-urltitle");
            const alias = this.getAttribute("data-urlcode");

            const titleEle = document.getElementById("title" + alias);
            const aliasEle = document.getElementById("alias" + alias);

            titleEle.value = title;
            aliasEle.value = alias;
        });
    });

    // "More" dropdown toggle
    // Get all the toggle btns
    const dropdownToggle = document.querySelectorAll(".drop-btn");
    dropdownToggle.forEach(btn => {
        btn.addEventListener("click", function(event) {
            event.stopPropagation(); // Stop event propagation
            const code = this.dataset.code;
            const dropdownContent = document.getElementById("dropdown-content-" + code);
            dropdownContent.classList.toggle("show");
        });
    });

    // Close the dropdown if the user clicks outside of it
    window.onclick = function(event) {
        const dropdownContents = document.querySelectorAll(".more-dropdown-content");
        dropdownContents.forEach(content => {
            if (!event.target.matches('.dropbtn')) {
                content.classList.remove("show");
            }
        });
    };

    if (window.location.pathname === "/profile/") {
        // Update the username
        const usernameField = document.getElementById("usernameInput");
        const updateUsernameBtn = document.getElementById("updateUsernameBtn");
        const initialUsername = updateUsernameBtn.dataset.name;
        updateUsernameBtn.disabled = true;

        usernameField.addEventListener("input", function() {
            updateUsernameBtn.disabled = (usernameField.value === initialUsername);
        });

        // Event listener for the "Update username" button
        updateUsernameBtn.addEventListener("click", function() {
            // Get the new username from the input field
            const name = document.getElementById("usernameInput").value;

            // Get the CSRF token from the page
            const csrftoken = document.querySelector("[name=csrfmiddlewaretoken]").value;

            // Log the new username to the console (for debugging purposes)
            console.log(name);

            // Make a fetch request to update the username
            fetch(window.location.protocol + "//" + window.location.host + "/update/username", {
                method: "POST",
                headers: {
                    "X-CSRFToken": csrftoken,
                },
                body: JSON.stringify({
                    username: name,
                })
            })
            .then(response => {
                // Check if the response is successful
                if (!response.ok) {
                    throw new Error(`Http error! Status: ${response.status}`);
                }
                // Parse the response as JSON
                return response.json();
            })
            .then(data => {
                // Update the button's dataset and disable it
                updateUsernameBtn.dataset.name = name;
                updateUsernameBtn.disabled = true;

                // Set the new value and create a new input field
                document.getElementById("usernameInput").setAttribute("value", name);
                const newInput = document.createElement("input");
                newInput.id = "usernameInput";
                newInput.classList.add("form-control");
                newInput.type = "text";
                newInput.style.border = "2px solid #0000cc;"
                newInput.style.marginBottom = "10px";
                newInput.setAttribute("value", name);
                newInput.autocomplete = "off";

                // Replace the old input field with the new one
                document.getElementById("usernameInput").parentNode.replaceChild(newInput, document.getElementById("usernameInput"));

                // Update the user info dropdown with the new username
                document.getElementById("userInfoDropdown").innerHTML = `<div class="avatar"><span>${name[0]}</span></div> ${name}`;

                // Replace the old avatar in the dropdown with the new one
                const oldAvatarDiv = document.getElementById("avatarDropdown");
                const newAvatarDiv = document.createElement("div");
                newAvatarDiv.id = "avatarDropdown";

                const newAvatarIcon = document.createElement("div");
                newAvatarIcon.classList.add("avatar");

                const newAvatarSpan = document.createElement("span");
                newAvatarSpan.innerHTML = name[0];

                newAvatarIcon.appendChild(newAvatarSpan);
                newAvatarDiv.appendChild(newAvatarIcon);

                const usernameSpan = document.createElement("span");
                usernameSpan.innerHTML = " " + name;

                newAvatarDiv.appendChild(usernameSpan);

                oldAvatarDiv.parentNode.replaceChild(newAvatarDiv, oldAvatarDiv);

                // Replace the same thing but for the small screen
                document.getElementById("smUserInfoDropdown").innerHTML = `<div class="avatar"><span>${name[0]}</span></div>`;

                const smOldAvatarDiv = document.getElementById("smAvatarDropdown");
                const smNewAvatarDiv = document.createElement("div");
                smNewAvatarDiv.id = "avatarDropdown";

                const smNewAvatarIcon = document.createElement("div");
                smNewAvatarIcon.classList.add("avatar");

                const smNewAvatarSpan = document.createElement("span");
                smNewAvatarSpan.innerHTML = name[0];

                smNewAvatarIcon.appendChild(smNewAvatarSpan);
                smNewAvatarDiv.appendChild(smNewAvatarIcon);

                const smUsernameSpan = document.createElement("span");
                smUsernameSpan.innerHTML = " " + name;

                smNewAvatarDiv.appendChild(smUsernameSpan);

                smOldAvatarDiv.parentNode.replaceChild(smNewAvatarDiv, smOldAvatarDiv);

                // Show a toast message indicating success
                showToast(data.message);

                // Add an input event listener to check for changes in the new input field
                newInput.addEventListener("input", function() {
                    updateUsernameBtn.disabled = (newInput.value === updateUsernameBtn.dataset.name);
                });
            })
            .catch(error => {
                // Show a toast message for any errors that occur
                showToast("An error occurred while updating. Please try again.");
            });
        });
    }

    if ((window.location.pathname.startsWith("/links/") && window.location.pathname !== "/links/") || window.location.pathname === "/analytics/") {

        // Line charts for click trends
        const lineConfig = {
            type: "line",
            data: {
                labels: lineChartData.labels,
                datasets: [{
                    label: "Clicks",
                    backgroundColor: "rgba(75, 192, 192, 0.2)",
                    borderColor: "rgba(75, 192, 192, 1)",
                    borderWidth: 1,
                    data: lineChartData.counts,
                    fill: true,
                }],
            },
            options: {
                maintainAspectRatio: false,
            }
        };

        // Create a line chart with the specified configuration
        if (document.getElementById("clickCount").dataset.count !== "0") {
            const lineCtx = document.getElementById("lineChart").getContext("2d");
            const lineChart = new Chart(lineCtx, lineConfig);
        } 
        else {
            document.getElementById("lineChart").style.display = "none";
            document.getElementById("lineChartMessage").style.display = "block";
            document.getElementById("lineChartMessage").innerHTML = "No data to provide";
        }
        
        // Bar charts for locations
        const barConfig = {
            type: "bar",
            data: {
                labels: barChartData.labels,
                datasets: [{
                    label: 'Clicks',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                    data: barChartData.counts,
                }],
            },
            options: {
                maxBarThickness: 50,
            }
        };

        if (barChartData.counts.length === 0) {
            document.getElementById("barChart").style.display = "none";
            document.getElementById("barChartMessage").style.display = "block";
            document.getElementById("barChartMessage").innerHTML = "No data to provide";
        } 
        else {
            // Create a bar chart with the specified configurations
            document.getElementById("barChart").style.display = "block";
            const barCtx = document.getElementById("barChart").getContext("2d");
            const barChart = new Chart(barCtx, barConfig);
        }

        // Donut charts for devices
        const donutConfig = {
            type: "doughnut",
            data: {
                labels: donutChartData.labels,
                datasets: [{
                    data: donutChartData.counts,
                    backgroundColor: [
                        "rgba(0, 116, 204, 1)",
                        "rgba(77, 161, 255, 1)",
                        "rgba(26, 83, 255, 1)",
                        "rgba(240, 244, 249, 1)"
                    ],
                    hoverOffset: 10,
                }],
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
            }
        };
        
        if (donutChartData.counts.length === 0) {
            document.getElementById("donutChart").style.display = "none";
            document.getElementById("donutChartMessage").style.display = "block";
            document.getElementById("donutChartMessage").innerHTML = "No data to provide";
        } 
        else {
            // Create a donut chart with the specified configurations
            const donutCtx = document.getElementById("donutChart").getContext("2d");
            const donutChart = new Chart(donutCtx, donutConfig);
        }
    }
});

function displayErrorMessage(message) {
    const messageElement = document.querySelector(".message");
    messageElement.innerHTML = message;
    messageElement.style.display = "block";
}

function togglePasswordVisibility(passwordFieldId) {
    var passwordField = document.getElementById(passwordFieldId);
    var passwordFieldType = passwordField.getAttribute('type');
    var toggleButton = passwordField.nextElementSibling;

    if (passwordFieldType === 'password') {
        passwordField.setAttribute('type', 'text');
        toggleButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M38.8 5.1C28.4-3.1 13.3-1.2 5.1 9.2S-1.2 34.7 9.2 42.9l592 464c10.4 8.2 25.5 6.3 33.7-4.1s6.3-25.5-4.1-33.7L525.6 386.7c39.6-40.6 66.4-86.1 79.9-118.4c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C465.5 68.8 400.8 32 320 32c-68.2 0-125 26.3-169.3 60.8L38.8 5.1zM223.1 149.5C248.6 126.2 282.7 112 320 112c79.5 0 144 64.5 144 144c0 24.9-6.3 48.3-17.4 68.7L408 294.5c8.4-19.3 10.6-41.4 4.8-63.3c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3c0 10.2-2.4 19.8-6.6 28.3l-90.3-70.8zM373 389.9c-16.4 6.5-34.3 10.1-53 10.1c-79.5 0-144-64.5-144-144c0-6.9 .5-13.6 1.4-20.2L83.1 161.5C60.3 191.2 44 220.8 34.5 243.7c-3.3 7.9-3.3 16.7 0 24.6c14.9 35.7 46.2 87.7 93 131.1C174.5 443.2 239.2 480 320 480c47.8 0 89.9-12.9 126.2-32.5L373 389.9z"/></svg>';
    } else {
        passwordField.setAttribute('type', 'password');
        toggleButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" height="1em"><!--! Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><path d="M288 32c-80.8 0-145.5 36.8-192.6 80.6C48.6 156 17.3 208 2.5 243.7c-3.3 7.9-3.3 16.7 0 24.6C17.3 304 48.6 356 95.4 399.4C142.5 443.2 207.2 480 288 480s145.5-36.8 192.6-80.6c46.8-43.5 78.1-95.4 93-131.1c3.3-7.9 3.3-16.7 0-24.6c-14.9-35.7-46.2-87.7-93-131.1C433.5 68.8 368.8 32 288 32zM144 256a144 144 0 1 1 288 0 144 144 0 1 1 -288 0zm144-64c0 35.3-28.7 64-64 64c-7.1 0-13.9-1.2-20.3-3.3c-5.5-1.8-11.9 1.6-11.7 7.4c.3 6.9 1.3 13.8 3.2 20.7c13.7 51.2 66.4 81.6 117.6 67.9s81.6-66.4 67.9-117.6c-11.1-41.5-47.8-69.4-88.6-71.1c-5.8-.2-9.2 6.1-7.4 11.7c2.1 6.4 3.3 13.2 3.3 20.3z"/></svg>';
    }
}

function showToast(message) {
    const toastLiveExample = document.getElementById("liveToast");
    const toastBootstrap = bootstrap.Toast.getOrCreateInstance(toastLiveExample);
    document.getElementById("toast-body").innerHTML = message;
    toastBootstrap.show();
}