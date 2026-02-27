// 1. BACKEND LINK
const scriptURL = 'https://script.google.com/macros/s/AKfycbwQIFq7Ty8uKloBdfgMMl93k7Ku7Z_E-NoGwMgAIbr_89vhnQSBN-989CQJUdzr9LTA/exec';

// 2. DYNAMIC NEWS DATA (Full Restore)
const newsData = [
    {
        title: "Emergency Response: Northeastern Floods",
        image: "https://images.unsplash.com/photo-1547619292-8816ee7cdd50?q=80&w=500",
        description: "Deploying high-impact WASH and Protection protocols for displaced families in conflict zones.",
        date: "DEC 2025",
        fullStory: "In the wake of devastating seasonal floods, GEPaDC has mobilized emergency teams to the frontlines in Borno State. Our response focuses on the 'Protection-First' model, ensuring that displaced women and children have access to clean water (WASH) and safe spaces. We are currently supporting over 500 households with dignity kits and psychological first aid to mitigate the secondary trauma of displacement."
    },
    {
        title: "The POWERR Project Initiative",
        image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=500",
        description: "Redefining women's leadership through strategic institutional advocacy and economic empowerment.",
        date: "JAN 2026",
        fullStory: "The POWERR Project (Promoting Women’s Equality, Rights, and Responsibilities) is our flagship institutional reform program. By working directly with community gatekeepers and traditional councils, we are creating sustainable pathways for women to enter local governance. This month, we successfully trained 40 women leaders in conflict mediation, marking a shift in how peace is negotiated at the grassroots level."
    },
    {
        title: "Women, Peace & Security Forum",
        image: "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=500",
        description: "Engaging global stakeholders on the Borno State stability framework and gender inclusion.",
        date: "FEB 2026",
        fullStory: "Our annual WPS Forum brought together international donors and local activists to harmonize the stability framework for Northeastern Nigeria. The consensus was clear: peace is impossible without gender justice. GEPaDC presented its 5-year data roadmap on gender-based violence trends, which will now serve as a primary resource for regional policy development by international partners."
    }
];

// 3. DISPLAY NEWS (Restored index-based triggers)
function displayNews() {
    const grid = document.getElementById('news-grid');
    if(!grid) return;
    grid.innerHTML = ""; 
    
    newsData.forEach((item, index) => {
        grid.innerHTML += `
            <div class="border-l border-b border-black p-12 group hover:bg-black hover:text-white transition-all duration-700" 
                 data-aos="fade-up" 
                 data-aos-delay="${index * 150}">
                <p class="text-[#2D5A27] text-[10px] font-black mb-6 tracking-[0.3em] uppercase group-hover:text-white">${item.date}</p>
                <div class="overflow-hidden mb-8 h-64 bg-gray-100">
                    <img src="${item.image}" class="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition duration-1000">
                </div>
                <h3 class="text-2xl font-black italic mb-6 leading-tight uppercase tracking-tighter">${item.title}</h3>
                <p class="text-gray-500 group-hover:text-gray-300 text-sm mb-8 leading-relaxed">${item.description}</p>
                
                <button onclick="openNewsModal(${index})" class="flex items-center gap-4 group/btn">
                    <div class="w-8 h-[2px] bg-[#2D5A27] group-hover/btn:w-12 transition-all group-hover:bg-white"></div>
                    <span class="text-[10px] font-black uppercase tracking-widest">Read Full Story</span>
                </button>
            </div>`;
    });
}

// 4. NEWS READER SYSTEM (Restored popup logic)
function openNewsModal(index) {
    const news = newsData[index];
    const container = document.getElementById('newsFullContent');
    const modal = document.getElementById('newsModal');

    container.innerHTML = `
        <p class="text-[#2D5A27] font-black tracking-[.3em] uppercase text-xs mb-4">${news.date}</p>
        <h2 class="text-4xl md:text-6xl font-black uppercase italic mb-10 leading-none tracking-tighter">${news.title}</h2>
        <div class="w-full h-[50vh] overflow-hidden mb-12 shadow-2xl">
            <img src="${news.image}" class="w-full h-full object-cover">
        </div>
        <div class="max-w-2xl mx-auto">
            <div class="text-xl text-gray-800 leading-relaxed space-y-6 first-letter:text-7xl first-letter:font-black first-letter:text-[#2D5A27] first-letter:mr-3 first-letter:float-left">
                ${news.fullStory}
            </div>
            <div class="mt-16 pt-10 border-t border-gray-100 flex justify-between items-center">
                <p class="text-[10px] font-black uppercase tracking-widest text-gray-400">GEPaDC Global Dispatch</p>
                <button onclick="toggleModal(); closeNewsModal();" class="bg-black text-white px-8 py-4 font-black text-[10px] uppercase tracking-widest hover:bg-[#2D5A27] transition">Donate to this cause</button>
            </div>
        </div>
    `;

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
}

function closeNewsModal() {
    document.getElementById('newsModal').classList.add('hidden');
    document.body.style.overflow = 'auto';
}

// 5. MODAL CONTROL
function toggleModal() {
    const modal = document.getElementById('donateModal');
    if (modal) {
        modal.classList.toggle('hidden');
        document.body.style.overflow = modal.classList.contains('hidden') ? 'auto' : 'hidden';
    }
}

// 6. UNIVERSAL SUBMISSION ENGINE (Fully Restored)
async function submitToSheet(data, msgId, formId, btnId) {
    const btn = document.getElementById(btnId);
    if (!btn) return;
    
    const originalText = btn.innerText;
    btn.disabled = true;
    btn.innerText = "VERIFYING...";
    
    try {
        await fetch(scriptURL, { 
            method: 'POST', 
            mode: 'no-cors', 
            cache: 'no-cache',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data) 
        });
        
        const msg = document.getElementById(msgId);
        if(msg) msg.classList.remove('hidden');
        document.getElementById(formId).reset();
        
        setTimeout(() => { 
            if(msg) msg.classList.add('hidden'); 
            if(formId === 'donorForm') toggleModal();
        }, 4000);
        
    } catch (error) {
        alert("Institutional Connection Error. Please verify your network.");
    } finally {
        btn.disabled = false;
        btn.innerText = originalText;
    }
}

// 7. LIVE SYSTEM
function initLiveSystem() {
    const dateEl = document.getElementById('liveDate');
    const timeEl = document.getElementById('liveTime');
    if(!dateEl || !timeEl) return;

    function update() {
        const now = new Date();
        dateEl.innerText = now.toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' }).toUpperCase();
        timeEl.innerText = now.toLocaleTimeString('en-GB', { hour12: false });
    }
    setInterval(update, 1000);
    update();
}

document.addEventListener('DOMContentLoaded', () => {
    displayNews();
    initLiveSystem();

    document.getElementById('donorForm')?.addEventListener('submit', e => {
        e.preventDefault();
        submitToSheet({
            type: "DONATION",
            name: document.getElementById('donorName').value,
            amount: document.getElementById('donorAmount').value,
            reference: document.getElementById('donorRef').value,
            timestamp: new Date().toISOString()
        }, 'donorMsg', 'donorForm', 'donorSubmitBtn');
    });
});


