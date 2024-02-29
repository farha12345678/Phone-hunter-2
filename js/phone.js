const loadPhone = async (searchText, isShowAll) => {
  const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`)
  const data = await res.json()
  const phones = data.data;
  displayPhones(phones, isShowAll);

}
const displayPhones = (phones, isShowAll) => {
  const phoneContainer = document.getElementById('phone-container')
  phoneContainer.textContent = '';
  const showAll = document.getElementById('show-all-container')
  if (phones.length > 10 && !isShowAll) {
    showAll.classList.remove('hidden')
  }
  else {
    showAll.classList.add('hidden')
  }
  if (!isShowAll) {
    phones = phones.slice(0, 10);
  }
  phones.forEach(phone => {
    const phoneCard = document.createElement('div');
    phoneCard.classList = 'card bg-gray-100 p-4 shadow-xl'
    phoneCard.innerHTML = `
    <figure><img src="${phone.image}" /></figure>
            <div class="card-body">
              <h2 class="card-title">"${phone.phone_name}"</h2>
              <p>If a dog chews shoes whose shoes does he choose?</p>
              <div class="card-actions justify-center">
                <button onclick="showDetails('${phone.slug}')" class="btn btn-primary text-white">Show Details</button>
              </div>
            </div>
    `
    phoneContainer.appendChild(phoneCard)
  });
  loadingSpinner(false)
}
// showDetails
const showDetails = async (id) => {

  const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
  const data = await res.json()
  const phone = data.data
  showPhoneDetails(phone)
}
// show details
const showPhoneDetails = (phone) => {
  const phoneName = document.getElementById('phone-name');
  phoneName.innerText = phone.name
  const showAllContainer = document.getElementById('show-detail-container');
  showAllContainer.innerHTML = `
  <img src="${phone.image}" alt=""/>
  <p class="text-lg text-black"><span class="font-semibold text-2xl text-black">Storage:</span>${phone?.mainFeatures?.storage}</p>
  <p class="text-lg  text-black"><span class="font-semibold text-2xl text-black">GPS:</span>${phone?.others?.GPS || 'No GPS found'}</p>

  `
  show_modal.showModal();
}



// handle search
const handleSearch = (isShowAll) => {
  loadingSpinner(true)
  const searchField = document.getElementById('search-field')
  const searchText = searchField.value;
  loadPhone(searchText, isShowAll)

}
// loader
const loadingSpinner = (isLoading) => {
  const loadingPhone = document.getElementById('loading-phone')
  if (isLoading) {
    loadingPhone.classList.remove('hidden')
  }
  else {
    loadingPhone.classList.add('hidden')
  }
}


loadPhone()
const handleShowAll = () => {
  handleSearch(true)
}