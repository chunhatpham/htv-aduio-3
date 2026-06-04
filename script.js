const adLinks = [
    "https://vt.tiktok.com/ZS9Fn14yJFRqB-bHOs8/",
    "https://vt.tiktok.com/ZS9Fn1nLXnbD1-PFNgb/",
    "https://vt.tiktok.com/ZS9Fn1vS6FVSw-sMJm8/",
    "https://vt.tiktok.com/ZS9Fn1TqfnjrH-LoO1N/",
    "https://vt.tiktok.com/ZS9FnJ8r9EYp7-8OldA/",
    "https://vt.tiktok.com/ZS9FnJFx3aagR-fOo9a/",
    "https://vt.tiktok.com/ZS9FnJjmRv1Cd-TI8xw/",
    "https://vt.tiktok.com/ZS9FnJkQVR3A8-o6a8C/",
    "https://vt.tiktok.com/ZS9FnJatYHXLn-Fc95A/",
    "https://vt.tiktok.com/ZS9FnJs9pPXsv-yAkde/",
"https://vt.tiktok.com/ZS9eQnVNkWqrH-NDwQg/",
    "https://vt.tiktok.com/ZS9eQnpk1jcTU-0sAGn/",
    "https://vt.tiktok.com/ZS9eQntSfgCqA-VUA7g/",
    "https://vt.tiktok.com/ZS9RdMkvcsYJR-5XXqs/",
    "https://vt.tiktok.com/ZS9RdMDFCcqDr-Wkvnr/",
    "https://vt.tiktok.com/ZS9RdM5HDghE3-elmmE/",
    "https://vt.tiktok.com/ZS9RdMaACXLWq-W52rL/",
    "https://vt.tiktok.com/ZS9RdMQDJELpG-ro8Sc/",
    "https://vt.tiktok.com/ZS9RdMqtxbCqJ-sPyPM/",
    "https://vt.tiktok.com/ZS9RdMnUbwUyf-ajbD7/",
    "https://vt.tiktok.com/ZS9RdMWyakByQ-0Uozs/",
];

const loader = document.getElementById('loader');
const modal = document.getElementById('customModal');
const modalTitle = document.getElementById('modalTitle');
const modalMessage = document.getElementById('modalMessage');
const modalIcon = document.getElementById('modalIcon');

function showLoader() { loader.classList.add('active'); }
function hideLoader() { loader.classList.remove('active'); }

function closeWelcomeAlert() {
    document.getElementById('welcomeAlertModal').classList.remove('active');
    showLoader();
    setTimeout(() => { hideLoader(); }, 800); // Tăng tí xíu để xem loader mới cho rõ
}

function showModal(title, message, isSuccess = false) {
    modalTitle.innerText = title; 
    modalMessage.innerText = message; 
    if(isSuccess) {
        modalIcon.className = "fa-solid fa-circle-check";
        modalIcon.style.color = "#34c759"; // iOS green
    } else {
        modalIcon.className = "fa-solid fa-circle-exclamation";
        modalIcon.style.color = "#ff3b30"; // iOS red
    }
    modal.classList.add('active');
}

function closeModal() { modal.classList.remove('active'); }

function submitContactForm() {
    showLoader();
    setTimeout(() => { hideLoader(); showModal('Thành Công', 'Tin nhắn của bạn đã được gửi!', true); }, 1000);
}

// QUẢN LÝ DETAIL MODAL VÀ AUDIO
const movieDetailModal = document.getElementById('movieDetailModal');
const detailTitle = document.getElementById('detailTitle');
const detailPoster = document.getElementById('detailPoster');
const watchNowBtn = document.getElementById('watchNowBtn');

const customAudioPlayer = document.getElementById('customAudioPlayer');
const audioPlayer = document.getElementById('audioPlayer');
const playPauseBtn = document.getElementById('playPauseBtn');
const playIcon = document.getElementById('playIcon');
const progressBar = document.getElementById('progressBar');
const currentTimeEl = document.getElementById('currentTime');
const totalTimeEl = document.getElementById('totalTime');
const rewindBtn = document.getElementById('rewindBtn');
const forwardBtn = document.getElementById('forwardBtn');
const speedBtn = document.getElementById('speedBtn');
const muteBtn = document.getElementById('muteBtn');
const volumeIcon = document.getElementById('volumeIcon');

let isPlaying = false;

function openMovieDetail(title, linkUrl, imageUrl) {
    detailTitle.innerText = title; 
    detailPoster.style.backgroundImage = `url('${imageUrl}')`;
    
    if(linkUrl === '#') {
        watchNowBtn.style.display = 'flex';
        customAudioPlayer.style.display = 'none';
        audioPlayer.pause();
        audioPlayer.src = '';
        watchNowBtn.onclick = function(e) {
            e.preventDefault();
            showModal('Đang Cập Nhật', 'Bộ phim này hiện đang chờ cập nhật Link xem chính thức!');
        };
    } else {
        watchNowBtn.style.display = 'none';
        customAudioPlayer.style.display = 'block';
        resetPlayerUI();
        audioPlayer.src = linkUrl;
        audioPlayer.load();
    }

    movieDetailModal.classList.add('active');
}

function closeMovieDetail() { 
    movieDetailModal.classList.remove('active'); 
    audioPlayer.pause(); 
    isPlaying = false;
    playIcon.className = "fa-solid fa-play";
}

movieDetailModal.addEventListener('click', function(e) { 
    if(e.target === movieDetailModal) closeMovieDetail(); 
});

function resetPlayerUI() {
    playIcon.className = "fa-solid fa-play";
    isPlaying = false;
    progressBar.value = 0;
    currentTimeEl.innerText = "00:00";
    totalTimeEl.innerText = "00:00";
    audioPlayer.playbackRate = 1.0;
    speedBtn.innerText = "1.0x";
}

function formatTime(time) {
    if (isNaN(time) || !isFinite(time)) return "00:00";
    const min = Math.floor(time / 60);
    const sec = Math.floor(time % 60);
    return `${min < 10 ? '0' : ''}${min}:${sec < 10 ? '0' : ''}${sec}`;
}

playPauseBtn.addEventListener('click', () => {
    if (isPlaying) {
        audioPlayer.pause();
        playIcon.className = "fa-solid fa-play";
        isPlaying = false;
    } else {
        const playPromise = audioPlayer.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
                playIcon.className = "fa-solid fa-pause";
                isPlaying = true;
            }).catch(error => {
                showModal('Đang Kết Nối', 'Hệ Thống Đang Kết Nối Phim Vui Lòng Đợi Chút', true);
                setTimeout(() => { window.open(audioPlayer.src, '_blank'); }, 1500);
            });
        }
    }
});

audioPlayer.addEventListener('timeupdate', () => {
    const current = audioPlayer.currentTime;
    const duration = audioPlayer.duration;
    currentTimeEl.innerText = formatTime(current);
    if (!isNaN(duration) && isFinite(duration)) {
        totalTimeEl.innerText = formatTime(duration);
        progressBar.max = duration;
    }
    if (duration > 0) progressBar.value = current;
});

audioPlayer.addEventListener('loadedmetadata', () => {
    if (!isNaN(audioPlayer.duration) && isFinite(audioPlayer.duration)) {
        totalTimeEl.innerText = formatTime(audioPlayer.duration);
        progressBar.max = audioPlayer.duration;
    }
});

progressBar.addEventListener('input', () => { audioPlayer.currentTime = progressBar.value; });
rewindBtn.addEventListener('click', () => { audioPlayer.currentTime = Math.max(0, audioPlayer.currentTime - 10); });
forwardBtn.addEventListener('click', () => { audioPlayer.currentTime = Math.min(audioPlayer.duration, audioPlayer.currentTime + 10); });

speedBtn.addEventListener('click', () => {
    let currentSpeed = audioPlayer.playbackRate;
    if (currentSpeed === 1.0) currentSpeed = 1.25;
    else if (currentSpeed === 1.25) currentSpeed = 1.5;
    else if (currentSpeed === 1.5) currentSpeed = 2.0;
    else currentSpeed = 1.0;
    audioPlayer.playbackRate = currentSpeed;
    speedBtn.innerText = currentSpeed + "x";
});

muteBtn.addEventListener('click', () => {
    audioPlayer.muted = !audioPlayer.muted;
    if (audioPlayer.muted) {
        volumeIcon.className = "fa-solid fa-volume-xmark";
        volumeIcon.style.color = "#ff3b30"; 
    } else {
        volumeIcon.className = "fa-solid fa-volume-high";
        volumeIcon.style.color = "var(--text-main)";
    }
});

audioPlayer.addEventListener('ended', () => {
    isPlaying = false;
    playIcon.className = "fa-solid fa-play";
    progressBar.value = 0;
    audioPlayer.currentTime = 0;
});

// KHUNG PHIM VÀ LOGIC HIỆU ỨNG TRƯỚC KHI MỞ
let globalAdProgress = 0; 

function createMovieCard(isNew = false, movieName = "Siêu Phẩm Bún Truyện", movieLink = "#", imageUrl = "https://i.postimg.cc/13jRWgdP/IMG-3436.jpg") {
    const card = document.createElement('div');
    card.classList.add('movie-card');
    const isUpdating = (movieLink === "#");

    card.innerHTML = `
        ${isNew ? '<div class="badge-new">NEW</div>' : ''}
        <div class="movie-thumbnail">
            <div class="bg-blur" style="background-image: url('${imageUrl}'); ${!isUpdating ? 'filter: none;' : ''}"></div>
            ${isUpdating ? '<div class="update-text"><i class="fa-solid fa-spinner fa-spin" style="margin-right:5px;"></i> Đang cập nhật</div>' : ''}
        </div>
        <div class="movie-info">
            <h2 class="searchable-title">${movieName}</h2> 
        </div>
    `;
    
    card.addEventListener('click', () => {
        if (globalAdProgress < 3) {
            globalAdProgress++;
            const toast = document.getElementById('adProgressToast');
            const toastText = document.getElementById('adProgressText');
            toastText.innerText = `Tiến Độ: ${globalAdProgress}/3`;
            toast.classList.add('active');
            
            setTimeout(() => { toast.classList.remove('active'); }, 3500);
            
            const randomAd = adLinks[Math.floor(Math.random() * adLinks.length)];
            window.open(randomAd, '_blank');
            
            if (globalAdProgress === 3) {
                // RESET VÀ HIỆN LOADING TRƯỚC KHI VÀO PHIM
                globalAdProgress = 0; 
                showLoader();
                setTimeout(() => {
                    hideLoader();
                    openMovieDetail(movieName, movieLink, imageUrl);
                }, 1200); // 1.2s loading effect
            }
        } else {
            globalAdProgress = 0;
            showLoader();
            setTimeout(() => {
                hideLoader();
                openMovieDetail(movieName, movieLink, imageUrl);
            }, 1200);
        }
    });
    
    return card;
}

const realMovies = [
{
        name: "Miễn Cưỡng Đánh Hôn Thê",
        link: "https://videotourl.com/audio/1779762204409-bc5d72e5-0869-4509-b715-670a742e5b3f.m4a",
        image: "https://i.postimg.cc/QNywYsqT/21194A58-D302-4AC4-9503-7ACFEF6A8975.jpg"
    },
{
        name: "Cô Vợ Khó Tính",
        link: "https://videotourl.com/audio/1779628942671-ecdcd3da-9cfc-4a2b-b4b8-68fd17c76a99.m4a",
        image: "https://i.postimg.cc/PfpL56Y9/A36A93B1-4121-4364-B503-065071C32CDB.jpg"
    },
{
        name: "Vô Tình Cứu Nữ Minh Tinh",
        link: "https://videotourl.com/audio/1779539473772-19d37259-ee9e-4557-aa79-dae871d4d38c.m4a",
        image: "https://i.postimg.cc/66PBWrhy/CBB3E1A9-1BB6-4B5B-9883-55020A7FE6A0.jpg"
    },
{
        name: "Quỳ Gối Trước Nữ Chính",
        link: "https://videotourl.com/audio/1779530166743-59ce9279-dc62-4957-b8ae-2121f3de98ed.m4a",
        image: "https://i.postimg.cc/kMbM0dML/02B42649-CEE4-4671-8019-0AAA9E7C84C7.jpg"
    },
{
        name: "Thiên Sư Tài Năng Trở Về",
        link: "https://videotourl.com/audio/1779512418985-4c3332f8-319a-49fe-bf92-7566c80d2193.m4a",
        image: "https://i.postimg.cc/PJk97RwZ/151733DA-A47B-4E21-BD88-2D756992E4E2.jpg"
    },
{
        name: "Bị Người Yêu Phản Bội",
        link: "https://videotourl.com/audio/1779510625382-34c1f234-40ba-43d6-92e3-e47ccafa0485.m4a",
        image: "https://i.postimg.cc/Bn197HL9/BD844290-C447-46D9-BB87-356045B3E871.jpg"
    },
{
        name: "Thiếu Gia Đê Tiện",
        link: "https://videotourl.com/audio/1779427390761-8f2ecf0a-2941-491f-a2ca-fb4d576c111a.m4a",
        image: "https://i.postimg.cc/pdCWrxBV/32C341A5-9AA9-4E6B-BACA-0C262A6CD400.jpg"
    },
{
        name: "Anh Trai Trọng Sinh Để Hại Tôi",
        link: "https://videotourl.com/audio/1779328690892-be92077a-5633-4cbb-82f8-bc2ef8d32ed7.m4a",
        image: "https://i.postimg.cc/90GP2jFF/A27346E2-3010-4D7E-8958-DA248791643B.jpg"
    },
{
        name: "Giúp Đỡ 7 Cô Gái",
        link: "https://videotourl.com/audio/1779293643722-ecc22ece-c83b-4b11-9570-67a005806ae1.m4a",
        image: "https://i.postimg.cc/s23xdqgh/BCB1FA49-2759-4FF1-8EF9-66069C901FB9.jpg"
    },
{
        name: "Nữ Sinh Giả Tạo",
        link: "https://videotourl.com/audio/1779148895590-54134241-9b80-493a-8251-41b3fc2ad8d9.m4a",
        image: "https://i.postimg.cc/43x0SWXm/15C0D78E-5F61-4EC4-8B34-4A9CCBFAAE2B.jpg"
    },
{
        name: "Bị Ép Li Hôn Trong Đêm",
        link: "https://videotourl.com/audio/1779079619320-018df51e-2851-494d-a271-976889348619.m4a",
        image: "https://i.postimg.cc/MHKhJjrG/7028BE75-50B3-4A60-8FD2-FA4BDF20A253.jpg"
    },
{
        name: "Con Trai Cưng Của Mẹ",
        link: "https://videotourl.com/audio/1779025099019-7fd7e3f4-7530-4a08-94f9-a81ccff22f58.m4a",
        image: "https://i.postimg.cc/tRkK63J0/501754C8-6A2D-4EF9-9D6E-58B8CAD9137A.jpg"
    },
{
        name: "Phế Vật Gả Cưới Vợ",
        link: "https://videotourl.com/audio/1778990346390-9a0c3679-c3d4-4af5-b748-2ee4c796b5d5.m4a",
        image: "https://i.postimg.cc/Jh4TzX8W/B3033EBC-A1C0-4245-BB73-3DD6B2565C0D.jpg"
    },
{
        name: "Vạch Trần Sự Thật",
        link: "https://videotourl.com/audio/1778906665562-71df136b-36d0-4170-bd55-115ef1776876.m4a",
        image: "https://i.postimg.cc/0j8yBvyR/69E9EF66-0DBB-4FC0-B8C9-E8BD441D4308.jpg"
    },
{
        name: "Bị Tố Cáo Hối Lộ",
        link: "https://videotourl.com/audio/1778856930369-6f3d29c2-9808-4f09-8d47-f52bd254c984.m4a",
        image: "https://i.postimg.cc/fy3cv38k/91966387-F9EA-410E-ABEE-9B099BF2C9D4.jpg"
    },
{
        name: "Bạn Trai Thất Lạc",
        link: "https://videotourl.com/audio/1778821157633-acfc4f2a-b980-4849-b727-26554acb8832.m4a",
        image: "https://i.postimg.cc/YSgTNd4K/D4A4DE6A-D71D-48DE-ACAC-238AA0B448B8.jpg"
    },
{
        name: "Trở Về Ngày Bị Ny Hãm Hại",
        link: "https://videotourl.com/audio/1778764485735-0104c087-f8d2-49af-9c18-3ad6c5a2ce27.m4a",
        image: "https://i.postimg.cc/wjqFcXvB/D7AA622E-0E83-4881-9FFC-7C94AF18FE7A.jpg"
    },
{
        name: "Hi Sinh Bản Thân Cứu Vợ",
        link: "https://videotourl.com/audio/1778733135560-db4a4b86-0ba8-4f6e-b13c-5dee0d9c3522.m4a",
        image: "https://i.postimg.cc/02RtC2CZ/986F72A3-EA8C-4A68-B3C2-166438F014B9.jpg"
    },
{
        name: "Đại Lão Tái Sinh Vào Thiếu Gia",
        link: "https://videotourl.com/audio/1778685267540-a6699153-8bca-48d7-b63e-fe07459a9009.m4a",
        image: "https://i.postimg.cc/jqNMtSBj/81E99508-4824-4567-B360-58F31D5CDB79.jpg"
    },
{
        name: "Trừng Trị Những Kẻ Chống Lại Mình",
        link: "https://videotourl.com/audio/1778685021726-ea9e23aa-afda-4627-8bcb-c5b9d1a7e559.m4a",
        image: "https://i.postimg.cc/2yBF52H6/995C44DB-72AE-4475-9A07-99EF8FC04272.jpg"
    },
    {
        name: "Lỡ Hôn Chị Hàng Xóm",
        link: "https://videotourl.com/audio/1778684411858-2def3e11-3970-4f60-8adb-d83618589744.m4a",
        image: "https://i.postimg.cc/QxwkRGdG/9A857C47-39AA-48B2-AC81-BC98CA71D89F.jpg"
    }
];

const homeGrid = document.getElementById('home-movie-grid');
const homeMovies = realMovies.slice(0, 10); 
homeMovies.forEach(movie => { homeGrid.appendChild(createMovieCard(true, movie.name, movie.link, movie.image)); });
for (let i = homeMovies.length; i < 10; i++) { homeGrid.appendChild(createMovieCard(true, "Siêu Phẩm Bún Truyện", "#", "https://i.postimg.cc/13jRWgdP/IMG-3436.jpg")); }

let currentListPage = 1;
let totalPages = Math.ceil(realMovies.length / 10);
if (totalPages === 0) totalPages = 1;

function loadListPage(pageNumber) {
    currentListPage = pageNumber;
    showLoader();
    setTimeout(() => {
        const listGrid = document.getElementById('list-movie-grid');
        listGrid.innerHTML = ''; 
        const startIndex = (pageNumber - 1) * 10;
        const pageMovies = realMovies.slice(startIndex, startIndex + 10);
        pageMovies.forEach(movie => { listGrid.appendChild(createMovieCard((pageNumber === 1), movie.name, movie.link, movie.image)); });
        for (let i = pageMovies.length; i < 10; i++) { listGrid.appendChild(createMovieCard(false, "Siêu Phẩm Bún Truyện", "#", "https://i.postimg.cc/13jRWgdP/IMG-3436.jpg")); }
        renderPagination();
        hideLoader();
        window.scrollTo({ top: 0, behavior: 'smooth' }); 
    }, 800);
}

function removeVietnameseTones(str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a"); str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e"); str = str.replace(/ì|í|ị|ỉ|ĩ/g,"i"); str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o"); str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u"); str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y"); str = str.replace(/đ/g,"d"); return str.toLowerCase().trim();
}

document.getElementById('searchBtn').addEventListener('click', () => {
    const searchBar = document.getElementById('searchBar');
    searchBar.classList.toggle('active');
    if (searchBar.classList.contains('active')) document.getElementById('searchInput').focus();
});

document.getElementById('executeSearch').addEventListener('click', () => {
    const searchInput = document.getElementById('searchInput');
    const query = searchInput.value.trim();
    if(query === '') { showModal('Lỗi', 'Vui lòng nhập tên truyện!'); return; }
    document.getElementById('searchBar').classList.remove('active');
    showLoader();
    setTimeout(() => {
        const normalizedQuery = removeVietnameseTones(query);
        const foundIndex = realMovies.findIndex(movie => removeVietnameseTones(movie.name).includes(normalizedQuery));
        if (foundIndex !== -1) {
            const foundMovie = realMovies[foundIndex];
            const targetPage = Math.floor(foundIndex / 10) + 1; 
            if (!document.getElementById('list-tab').classList.contains('active')) { switchTab('list-tab', targetPage); } 
            else { loadListPage(targetPage); }
            setTimeout(() => {
                hideLoader();
                const allCards = document.querySelectorAll('#list-tab .movie-card');
                let targetCard = null;
                for (let card of allCards) {
                    if (card.querySelector('.searchable-title').innerText === foundMovie.name) { targetCard = card; break; }
                }
                if (targetCard) {
                    targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    targetCard.classList.add('highlight-card');
                    setTimeout(() => targetCard.classList.remove('highlight-card'), 3000); 
                    showModal('Tìm Thấy', `Đã tìm thấy: ${foundMovie.name}!`, true);
                    searchInput.value = '';
                }
            }, 800); 
        } else {
            hideLoader();
            showModal('Không Tìm Thấy', `Rất tiếc, không tìm thấy phim nào.`);
        }
    }, 800); 
});

const sideMenu = document.getElementById('sideMenu');
const menuOverlay = document.getElementById('menuOverlay');
function closeMenu() { sideMenu.classList.remove('active'); menuOverlay.classList.remove('active'); }
document.getElementById('menuBtn').addEventListener('click', () => { sideMenu.classList.add('active'); menuOverlay.classList.add('active'); });
document.getElementById('closeMenuBtn').addEventListener('click', closeMenu);
menuOverlay.addEventListener('click', closeMenu); 

function renderPagination() {
    const paginationContainer = document.getElementById('list-pagination');
    let html = '';
    const prevClass = currentListPage === 1 ? 'disabled' : '';
    html += `<button class="page-btn ${prevClass}" onclick="if(currentListPage > 1) loadListPage(currentListPage - 1)"><i class="fa-solid fa-angle-left"></i></button>`;
    html += `<button class="page-btn ${currentListPage === 1 ? 'active' : ''}" onclick="loadListPage(1)">1</button>`;
    if (currentListPage > 3 && totalPages > 1) html += `<span class="page-btn dots">...</span>`;
    
    let start = Math.max(2, currentListPage - 1);
    let end = Math.min(totalPages - 1, currentListPage + 1);
    if (currentListPage === 1) end = Math.min(4, totalPages - 1);
    if (currentListPage === totalPages && totalPages > 3) start = Math.max(2, totalPages - 3);
    
    for (let i = start; i <= end; i++) { html += `<button class="page-btn ${currentListPage === i ? 'active' : ''}" onclick="loadListPage(${i})">${i}</button>`; }
    
    if (currentListPage < totalPages - 2 && totalPages > 1) html += `<span class="page-btn dots">...</span>`;
    if (totalPages > 1) { html += `<button class="page-btn ${currentListPage === totalPages ? 'active' : ''}" onclick="loadListPage(${totalPages})">${totalPages}</button>`; }
    
    const nextClass = currentListPage === totalPages ? 'disabled' : '';
    html += `<button class="page-btn ${nextClass}" onclick="if(currentListPage < totalPages) loadListPage(currentListPage + 1)"><i class="fa-solid fa-angle-right"></i></button>`;
    paginationContainer.innerHTML = html;
}

const navLinks = document.querySelectorAll('.nav-link');
const tabContents = document.querySelectorAll('.tab-content');
function switchTab(targetId, targetPage = 1) {
    closeMenu(); showLoader(); 
    setTimeout(() => {
        tabContents.forEach(tab => tab.classList.remove('active'));
        navLinks.forEach(link => link.classList.remove('active-link'));
        document.getElementById(targetId).classList.add('active');
        const activeLink = document.querySelector(`.nav-link[data-target="${targetId}"]`);
        if(activeLink) activeLink.classList.add('active-link');
        
        if(targetId === 'list-tab') { loadListPage(targetPage); } 
        else { hideLoader(); window.scrollTo({ top: 0, behavior: 'smooth' }); }
    }, 600);
}

navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        if(!this.classList.contains('active-link')) switchTab(this.getAttribute('data-target'));
        else closeMenu(); 
    });
});

document.getElementById('logoBtn').addEventListener('click', () => {
    const homeLink = document.querySelector(`.nav-link[data-target="home-tab"]`);
    if(!homeLink.classList.contains('active-link')) switchTab('home-tab');
});

renderPagination();
