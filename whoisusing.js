function selectProfile(profileName) {
    window.location.href = `index2.html?profile=${profileName}`;
}

function addProfile() {
    document.getElementById('addProfileModal').style.display = 'block';
}

function closeModal() {
    document.getElementById('addProfileModal').style.display = 'none';
}

function saveProfile() {
    const profileName = document.getElementById('profileName').value;
    const profileImageInput = document.getElementById('profileImage');
    
    if (!profileName || !profileImageInput.files[0]) {
        alert('Please enter a profile name and select an image.');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(event) {
        const profileImageUrl = event.target.result;
        const profilesContainer = document.getElementById('profiles');

        const profileDiv = document.createElement('div');
        profileDiv.className = 'profile';
        profileDiv.onclick = () => selectProfile(profileName);

        const profileImg = document.createElement('img');
        profileImg.src = profileImageUrl;
        profileImg.alt = profileName;

        const profileNameP = document.createElement('p');
        profileNameP.textContent = profileName;

        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-btn';
        deleteBtn.textContent = '×';
        deleteBtn.onclick = (e) => {
            e.stopPropagation();
            profilesContainer.removeChild(profileDiv);
        };

        const editBtn = document.createElement('button');
        editBtn.className = 'edit-btn';
        editBtn.textContent = '✎';
        editBtn.onclick = (e) => {
            e.stopPropagation();
            showEditProfileModal(profileDiv, profileNameP, profileImg);
        };

        profileDiv.appendChild(profileImg);
        profileDiv.appendChild(profileNameP);
        profileDiv.appendChild(deleteBtn);
        profileDiv.appendChild(editBtn);

        profilesContainer.appendChild(profileDiv);
    };
    
    reader.readAsDataURL(profileImageInput.files[0]);
    closeModal();
}

function showEditProfileModal(profileDiv, profileNameP, profileImg) {
    const editProfileModal = document.getElementById('editProfileModal');
    const editProfileNameInput = document.getElementById('editProfileName');
    const editProfileImageInput = document.getElementById('editProfileImage');
    editProfileNameInput.value = profileNameP.textContent;

    editProfileModal.style.display = 'block';

    const saveEditProfileBtn = document.getElementById('saveEditProfile');
    saveEditProfileBtn.onclick = () => {
        const newProfileName = editProfileNameInput.value;
        if (!newProfileName) {
            alert('Please enter a profile name.');
            return;
        }
        profileNameP.textContent = newProfileName;
        profileDiv.setAttribute('onclick', `selectProfile('${newProfileName}')`);

        const profileImageFile = editProfileImageInput.files[0];
        if (profileImageFile) {
            const reader = new FileReader();
            reader.onload = function(event) {
                profileImg.src = event.target.result;
            };
            reader.readAsDataURL(profileImageFile);
        }

        editProfileModal.style.display = 'none';
    };
}

function closeEditProfileModal() {
    document.getElementById('editProfileModal').style.display = 'none';
}
