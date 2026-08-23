/* =========================================================
   STUDYMATE AI
   CLEAN COMPLETE VERSION
========================================================= */


/* =========================================================
   CONFIG
========================================================= */

const STUDYMATE_AI_URL =
    "https://studymate-ai-backend-op3o.onrender.com/ask";

const STUDYMATE_IMAGE_URL =
    "https://studymate-ai-backend-op3o.onrender.com/generate-image";

const AI_FREE_DAILY_LIMIT = 5;


/* =========================================================
   AI STATE
========================================================= */

let currentAIMode = "normal";

let studyMateAIHistory = [];

let studyMateChats = [];

let currentChatId = null;

let studyMateAIFile = null;

let aiImageViewerHistory = false;

let aiNavigationActive = false;

let aiHistoryNavigationActive = false;


/* =========================================================
   ELEMENTS
========================================================= */

const aiButton =
    document.getElementById("studyMateAIButton");

const aiPanel =
    document.getElementById("studyMateAI");

const aiClose =
    document.getElementById("aiClose");

const aiNewChat =
    document.getElementById("aiNewChat");

const aiInput =
    document.getElementById("aiInput");

const aiSend =
    document.getElementById("aiSend");

const aiMessages =
    document.getElementById("aiMessages");

const aiTyping =
    document.getElementById("aiTyping");

const aiStatus =
    document.getElementById("aiStatus");

const aiFullscreen =
    document.getElementById("aiFullscreen");

const aiImageButton =
    document.getElementById("aiImageButton");

const aiHistoryButton =
    document.getElementById("aiHistory");

const aiHistoryPanel =
    document.getElementById("aiHistoryPanel");

const closeAIHistory =
    document.getElementById("closeAIHistory");

const aiHistoryList =
    document.getElementById("aiHistoryList");

const historyNewChat =
    document.getElementById("historyNewChat");

const aiFreeCounter =
    document.getElementById("aiFreeCounter");

const aiPremiumModal =
    document.getElementById("aiPremiumModal");

const aiUpgradeButton =
    document.getElementById("aiUpgradeButton");

const aiAttachButton =
    document.getElementById("aiAttachButton");

const aiFileInput =
    document.getElementById("aiFileInput");

const aiAttachmentPreview =
    document.getElementById("aiAttachmentPreview");


/* =========================================
   STUDYMATE AI PREMIUM
========================================= */

const STUDYMATE_PREMIUM_PAYMENTS = {

    monthly:
       "https://flutterwave.com/pay/8quzwqkyiwfp",

    yearly:
         "https://flutterwave.com/pay/znzmidtovxrb",

    chipper:
        "https://chipper.me/@support-StudyMate"

};


let selectedPremiumPlan = "yearly";
let selectedPremiumPrice = 10000;


/* =========================================
   PREMIUM ELEMENTS
========================================= */

const closeAIPremium =
    document.getElementById(
        "closeAIPremium"
    );

const premiumPlans =
    document.querySelectorAll(
        ".ai-premium-plan"
    );

/* =========================================================
   UPDATE AI FREE COUNTER
========================================================= */

function updateAIFreeCounter(){

    if(!aiFreeCounter){
        return;
    }


    /* =========================
       PREMIUM USER
    ========================= */

    if(isStudyMatePremium()){

        aiFreeCounter.textContent =
            "👑 Premium";

        aiFreeCounter.classList.remove(
            "low",
            "empty"
        );

        return;

    }


    /* =========================
       FREE USER
    ========================= */

    const remaining =
        getAIRemainingMessages();


    aiFreeCounter.textContent =
        `${remaining} free`;


    aiFreeCounter.classList.remove(
        "low",
        "empty"
    );


    if(remaining === 0){

        aiFreeCounter.classList.add(
            "empty"
        );

    }

    else if(remaining <= 2){

        aiFreeCounter.classList.add(
            "low"
        );

    }

}

/* =========================================================
   FREE COUNTER → PREMIUM MODAL
========================================================= */

if(aiFreeCounter){

    aiFreeCounter.addEventListener(
        "click",
        function(){

            if(!isStudyMatePremium()){

                showAIPremiumModal();

            }

        }
    );

}

/* =========================================
   CLOSE PREMIUM MODAL
========================================= */

if(closeAIPremium){

    closeAIPremium.addEventListener(
        "click",
        hideAIPremiumModal
    );

}


/* =========================================
   SHOW PREMIUM MODAL
========================================= */

function showAIPremiumModal(){

    if(!aiPremiumModal){
        return;
    }

    aiPremiumModal.classList.add(
        "show"
    );

}


/* =========================================
   HIDE PREMIUM MODAL
========================================= */

function hideAIPremiumModal(){

    if(!aiPremiumModal){
        return;
    }

    aiPremiumModal.classList.remove(
        "show"
    );

}


/* =========================================
   PLAN SELECTION
========================================= */

premiumPlans.forEach(plan => {

    plan.addEventListener(
        "click",
        function(){

            premiumPlans.forEach(item => {

                item.classList.remove(
                    "selected"
                );

            });


            this.classList.add(
                "selected"
            );


            selectedPremiumPlan =
                this.dataset.plan;


            selectedPremiumPrice =
                Number(
                    this.dataset.price
                );


            console.log(
                "Premium plan selected:",
                selectedPremiumPlan,
                selectedPremiumPrice
            );

        }
    );

});


/* =========================================
   PREMIUM PAYMENT ELEMENTS
========================================= */

const aiFlutterwavePayment =
    document.getElementById(
        "aiFlutterwavePayment"
    );

const aiChipperPayment =
    document.getElementById(
        "aiChipperPayment"
    );

const aiBankPayment =
    document.getElementById(
        "aiBankPayment"
    );

const aiBankDetails =
    document.getElementById(
        "aiBankDetails"
    );

const aiBankAmount =
    document.getElementById(
        "aiBankAmount"
    );

const aiCopyBankDetails =
    document.getElementById(
        "aiCopyBankDetails"
    );


/* =========================================
   UPDATE PAYMENT BUTTON
========================================= */

function updatePremiumPaymentButton(){

    if(!aiUpgradeButton){
        return;
    }

    if(selectedPremiumPlan === "monthly"){

        aiUpgradeButton.textContent =
            "👑 Pay ₦1,500";

    }

    else{

        aiUpgradeButton.textContent =
            "👑 Pay ₦10,000";

    }

}


/* =========================================
   PLAN SELECTION
========================================= */

premiumPlans.forEach(plan => {

    plan.addEventListener(
        "click",
        function(){

            premiumPlans.forEach(item => {

                item.classList.remove(
                    "selected"
                );

            });


            this.classList.add(
                "selected"
            );


            selectedPremiumPlan =
                this.dataset.plan;


            selectedPremiumPrice =
                Number(
                    this.dataset.price
                );


            if(aiBankAmount){

                aiBankAmount.textContent =
                    `₦${selectedPremiumPrice.toLocaleString()}`;

            }


            updatePremiumPaymentButton();

        }
    );

});


/* =========================================================
   FLUTTERWAVE PREMIUM PAYMENT
========================================================= */

if(aiFlutterwavePayment){

    aiFlutterwavePayment.addEventListener(
        "click",
        async function(){

            try{

                /* =========================
                   CHECK LOGIN
                ========================= */

                const user =
                    firebaseAuth.currentUser;


                if(!user){

                    alert(
                        "Please log in before purchasing StudyMate Premium."
                    );

                    return;

                }


                /* =========================
                   GET EMAIL
                ========================= */

                const email =
                    user.email;


                if(!email){

                    alert(
                        "Your account does not have an email address."
                    );

                    return;

                }


                /* =========================
                   BUTTON STATE
                ========================= */

                aiFlutterwavePayment.disabled =
                    true;

                aiFlutterwavePayment.textContent =
                    "⏳ Starting payment...";


                /* =========================
                   CREATE PAYMENT
                ========================= */

                const response =
                    await fetch(

                        STUDYMATE_AI_URL.replace(
                            "/ask",
                            "/create-payment"
                        ),

                        {

                            method: "POST",

                            headers: {

                                "Content-Type":
                                    "application/json"

                            },

                            body: JSON.stringify({

                                plan:
                                    selectedPremiumPlan,

                                email:
                                    email,

                                uid:
                                    user.uid

                            })

                        }

                    );


                const data =
                    await response.json();


                if(!response.ok){

                    throw new Error(
                        data.error ||
                        "Unable to start payment."
                    );

                }


                /* =========================
                   OPEN FLUTTERWAVE
                ========================= */

                if(!data.paymentLink){

                    throw new Error(
                        "No payment link was returned."
                    );

                }


                window.location.href =
                    data.paymentLink;

            }

            catch(error){

                console.error(
                    "❌ Premium payment error:",
                    error
                );


                alert(
                    error.message ||
                    "Could not start payment."
                );


                aiFlutterwavePayment.disabled =
                    false;

                updatePremiumPaymentButton();

            }

        }
    );

}


/* =========================================
   CHIPPER
========================================= */

if(aiChipperPayment){

    aiChipperPayment.addEventListener(
        "click",
        function(){

            window.open(
                STUDYMATE_PREMIUM_PAYMENTS.chipper,
                "_blank"
            );

        }
    );

}


/* =========================================
   BANK TRANSFER
========================================= */

if(aiBankPayment){

    aiBankPayment.addEventListener(
        "click",
        function(){

            if(!aiBankDetails){
                return;
            }


            const isVisible =
                aiBankDetails.style.display ===
                "block";


            aiBankDetails.style.display =
                isVisible
                    ? "none"
                    : "block";

        }
    );

}


/* =========================================
   COPY BANK ACCOUNT
========================================= */

if(aiCopyBankDetails){

    aiCopyBankDetails.addEventListener(
        "click",
        async function(){

            try{

                await navigator.clipboard.writeText(
                    "1830777757"
                );


                aiCopyBankDetails.textContent =
                    "✅ Account Number Copied";


                setTimeout(
                    () => {

                        aiCopyBankDetails.textContent =
                            "📋 Copy Account Number";

                    },
                    2000
                );

            }

            catch(error){

                alert(
                    "Account Number: 1830777757"
                );

            }

        }
    );

}


/* =========================================
   INITIAL PAYMENT BUTTON
========================================= */

updatePremiumPaymentButton();


/* =========================================
   CHIPPER PAYMENT
   OPTIONAL BUTTON SUPPORT
========================================= */

function openStudyMateChipper(){

    window.open(
        STUDYMATE_PREMIUM_PAYMENTS.chipper,
        "_blank"
    );

}


/* =========================================
   CLOSE MODAL WHEN BACKGROUND IS CLICKED
========================================= */

if(aiPremiumModal){

    aiPremiumModal.addEventListener(
        "click",
        function(event){

            if(
                event.target ===
                aiPremiumModal
            ){

                hideAIPremiumModal();

            }

        }
    );

}
/* =========================================================
   PREMIUM SYSTEM
========================================================= */

function isStudyMatePremium(){

    return localStorage.getItem(
        "studyMatePremium"
    ) === "true";

}

/* =========================================================
   PREMIUM PAYMENT SUCCESS
========================================================= */

async function checkPremiumPayment(){

    const params =
        new URLSearchParams(
            window.location.search
        );


    const premium =
        params.get("premium");

    const plan =
        params.get("plan");


    if(premium !== "success"){
        return;
    }


    /* =========================
       CHECK LOGIN
    ========================= */

    const user =
        firebaseAuth.currentUser;


    if(!user){

        console.error(
            "❌ No logged-in user after payment."
        );

        alert(
            "Payment was successful, but we couldn't identify your account. Please log in again."
        );

        return;

    }


    /* =========================
       SAVE PREMIUM TO FIRESTORE
    ========================= */

    const saved =
        await saveStudyMatePremium(
            plan || "monthly"
        );


    if(!saved){

        alert(
            "Payment was successful, but we couldn't activate Premium. Please contact StudyMate support."
        );

        return;

    }


    /* =========================
       UPDATE UI
    ========================= */

    updateAIFreeCounter();

    hideAIPremiumModal();


    /* =========================
       SUCCESS MESSAGE
    ========================= */

    alert(
        "🎉 StudyMate Premium activated successfully!"
    );


    /* =========================
       CLEAN URL
    ========================= */

    window.history.replaceState(
        {},
        document.title,
        window.location.pathname
    );

}


/* =========================================================
   CHECK PAYMENT AFTER PAGE LOAD
========================================================= */

checkPremiumPayment();

/* =========================================================
   AI USAGE
========================================================= */

function getAIUsage(){

    const today =
        new Date().toDateString();

    let usage = {};

    try{

        usage =
            JSON.parse(
                localStorage.getItem("aiUsage")
            ) || {};

    }

    catch(error){

        usage = {};

    }


    /* New day */

    if(usage.date !== today){

        usage = {

            date: today,

            count: 0

        };

        localStorage.setItem(
            "aiUsage",
            JSON.stringify(usage)
        );

    }

    return usage;

}



/* =========================================================
   CAN USE AI
========================================================= */

function canUseAI(){

    /* Premium = unlimited */

    if(isStudyMatePremium()){

        return true;

    }

    const usage =
        getAIUsage();

    return (
        usage.count <
        AI_FREE_DAILY_LIMIT
    );

}


/* =========================================================
   RECORD AI USAGE
========================================================= */

function recordAIUsage(){

    /* Premium users are unlimited */

    if(isStudyMatePremium()){

        return;

    }

    const usage =
        getAIUsage();

    usage.count++;

    localStorage.setItem(
        "aiUsage",
        JSON.stringify(usage)
    );

    updateAIFreeCounter();

}


/* =========================================================
   REMAINING AI MESSAGES
========================================================= */

function getAIRemainingMessages(){

    if(isStudyMatePremium()){

        return Infinity;

    }

    const usage =
        getAIUsage();

    return Math.max(
        0,
        AI_FREE_DAILY_LIMIT -
        usage.count
    );

}


/* =========================================================
   PREMIUM MODAL
========================================================= */

function showAIPremiumModal(){

    if(!aiPremiumModal){

        return;

    }

    aiPremiumModal.classList.add(
        "show"
    );

}


function hideAIPremiumModal(){

    if(!aiPremiumModal){

        return;

    }

    aiPremiumModal.classList.remove(
        "show"
    );

}


/* =========================================================
   PREMIUM CLOSE
========================================================= */

if(closeAIPremium){

    closeAIPremium.addEventListener(
        "click",
        hideAIPremiumModal
    );

}


/* =========================================================
   STUDYMATE PREMIUM — FIRESTORE
========================================================= */

async function saveStudyMatePremium(plan) {

    try {

        const user = firebaseAuth.currentUser;

        if (!user) {

            console.error(
                "❌ No logged-in user."
            );

            return false;

        }

        await firebaseSetDoc(

            firebaseDoc(
                firebaseDB,
                "users",
                user.uid
            ),

            {

                premium: true,

                premiumPlan: plan,

                premiumSince:
                    new Date().toISOString()

            },

            {
                merge: true
            }

        );


        /* Keep local status for fast loading */

        localStorage.setItem(
            "studyMatePremium",
            "true"
        );


        console.log(
            "👑 StudyMate Premium activated:",
            plan
        );


        return true;

    }

    catch(error) {

        console.error(
            "❌ Could not save Premium:",
            error
        );

        return false;

    }

}

async function loadStudyMatePremium() {

    try {

        /* =========================
           WAIT FOR FIREBASE AUTH
        ========================= */

        const user = await new Promise((resolve) => {

            if (firebaseAuth.currentUser) {

                resolve(firebaseAuth.currentUser);

                return;

            }


            const unsubscribe =
                firebaseAuth.onAuthStateChanged(
                    (currentUser) => {

                        unsubscribe();

                        resolve(currentUser);

                    }
                );

        });


        /* =========================
           NO USER
        ========================= */

        if (!user) {

            localStorage.removeItem(
                "studyMatePremium"
            );

            updateAIFreeCounter();

            return false;

        }


        console.log(
            "👤 Checking Premium for:",
            user.uid
        );


        /* =========================
           FIRESTORE USER DOCUMENT
        ========================= */

        const userRef =
            firebaseDoc(
                firebaseDB,
                "users",
                user.uid
            );


        const snapshot =
            await firebaseGetDoc(
                userRef
            );


        /* =========================
           PREMIUM FOUND
        ========================= */

        if (
            snapshot.exists() &&
            snapshot.data().premium === true
        ) {

            localStorage.setItem(
                "studyMatePremium",
                "true"
            );


            console.log(
                "👑 Premium account detected"
            );


            /* Update Premium UI */

            updateAIFreeCounter();


            return true;

        }


        /* =========================
           NOT PREMIUM
        ========================= */

        localStorage.removeItem(
            "studyMatePremium"
        );


        updateAIFreeCounter();


        return false;

    }


    catch(error) {

        console.error(
            "❌ Premium check failed:",
            error
        );


        return false;

    }

}

/* =========================================================
   LOAD SAVED AI DATA
========================================================= */

function loadSavedAIData(){

    try{

        studyMateAIHistory =
            JSON.parse(
                localStorage.getItem(
                    "studyMateAIHistory"
                )
            ) || [];

    }

    catch(error){

        studyMateAIHistory = [];

    }


    try{

        studyMateChats =
            JSON.parse(
                localStorage.getItem(
                    "studyMateChats"
                )
            ) || [];

    }

    catch(error){

        studyMateChats = [];

    }


    currentChatId =
        localStorage.getItem(
            "studyMateCurrentChatId"
        ) || null;

}


/* =========================================================
   SAVE AI HISTORY
========================================================= */

function saveAIHistory(){

    localStorage.setItem(
        "studyMateAIHistory",
        JSON.stringify(
            studyMateAIHistory
        )
    );

}


/* =========================================================
   SAVE CHATS
========================================================= */

function saveStudyMateChats(){

    localStorage.setItem(
        "studyMateChats",
        JSON.stringify(
            studyMateChats
        )
    );

}


/* =========================================================
   SAVE CURRENT CHAT
========================================================= */

function saveCurrentChat(){

    if(!currentChatId){

        return;

    }

    const chat =
        studyMateChats.find(
            item =>
                item.id === currentChatId
        );

    if(!chat){

        return;

    }

    chat.messages =
        [...studyMateAIHistory];

    chat.updated =
        Date.now();

    saveStudyMateChats();

}


/* =========================================================
   USER NAME
========================================================= */

function getAIUserName(){

    const name =
        localStorage.getItem("name");

    if(!name){

        return "there";

    }

    return name
        .trim()
        .split(/\s+/)[0];

}


/* =========================================================
   CREATE CHAT ID
========================================================= */

function createChatId(){

    return (
        Date.now().toString() +
        Math.random()
            .toString(36)
            .substring(2,8)
    );

}


/* =========================================================
   CHAT TITLE
========================================================= */

function generateChatTitle(text){

    if(!text){

        return "New Conversation";

    }

    let title =
        String(text)
            .trim()
            .replace(/\s+/g," ");

    if(title.length > 35){

        title =
            title.substring(0,35) +
            "...";

    }

    return title;

}


/* =========================================================
   CREATE NEW CHAT
========================================================= */

function createNewAIChat(){

    if(currentChatId){

        saveCurrentChat();

    }


    const chat = {

        id:
            createChatId(),

        title:
            "New Conversation",

        messages: [],

        created:
            Date.now(),

        updated:
            Date.now()

    };


    studyMateChats.unshift(
        chat
    );

    currentChatId =
        chat.id;

    studyMateAIHistory =
        [];


    localStorage.setItem(
        "studyMateCurrentChatId",
        currentChatId
    );

    saveAIHistory();

    saveStudyMateChats();

    showAIWelcome();

    renderAIHistory();


    if(aiHistoryPanel){

        aiHistoryPanel.classList.remove(
            "open"
        );

    }


    if(aiInput){

        aiInput.focus();

    }

}

/* =========================================================
   UPDATE CHAT TITLE
========================================================= */

function updateCurrentChatTitle(text){

    if(!currentChatId){

        return;

    }

    const chat =
        studyMateChats.find(
            item =>
                item.id === currentChatId
        );

    if(!chat){

        return;

    }


    if(
        chat.title ===
        "New Conversation"
    ){

        chat.title =
            generateChatTitle(text);

    }


    chat.messages =
        [...studyMateAIHistory];

    chat.updated =
        Date.now();

    saveStudyMateChats();

}


/* =========================================================
   WELCOME SCREEN
========================================================= */

function showAIWelcome(){

    if(!aiMessages){

        return;

    }


    aiMessages.innerHTML = `

        <div class="ai-welcome">

            <div class="welcome-icon">
                🤖
            </div>

            <h2>
                Hey ${escapeAIHTML(
                    getAIUserName()
                )}! 👋
            </h2>

            <p>
                I'm your StudyMate AI assistant.
                <br>
                What are we learning today?
            </p>

            <div class="ai-suggestions">

                <button
                    type="button"
                    onclick="askAISuggestion(
                        'Explain photosynthesis simply'
                    )"
                >
                    🌱 Explain a topic
                </button>

                <button
                    type="button"
                    onclick="askAISuggestion(
                        'Give me a mathematics practice question'
                    )"
                >
                    ➗ Practice Maths
                </button>

                <button
                    type="button"
                    onclick="askAISuggestion(
                        'Create a study plan for me'
                    )"
                >
                    📅 Study Plan
                </button>

                <button
                    type="button"
                    onclick="askAISuggestion(
                        'Quiz me on general science'
                    )"
                >
                    🧠 Quiz Me
                </button>

            </div>

        </div>

    `;

}


/* =========================================================
   ESCAPE HTML
========================================================= */

function escapeAIHTML(text){

    const div =
        document.createElement("div");

    div.textContent =
        text == null
            ? ""
            : String(text);

    return div.innerHTML;

}


/* =========================================================
   ESCAPE FILE NAME
========================================================= */

function escapeAIFileName(name){

    return escapeAIHTML(name);

}


/* =========================================================
   FORMAT AI TEXT
========================================================= */

function formatAIText(text){

    if(!text){

        return "";

    }

    let formatted =
        escapeAIHTML(text);


    formatted =
        formatted.replace(
            /^###\s?(.*)$/gim,
            "<h3>$1</h3>"
        );

    formatted =
        formatted.replace(
            /^##\s?(.*)$/gim,
            "<h2>$1</h2>"
        );

    formatted =
        formatted.replace(
            /^#\s?(.*)$/gim,
            "<h1>$1</h1>"
        );


    formatted =
        formatted.replace(
            /\*\*(.*?)\*\*/g,
            "<strong>$1</strong>"
        );


    formatted =
        formatted.replace(
            /\*(.*?)\*/g,
            "<em>$1</em>"
        );


    formatted =
        formatted.replace(
            /^\s*[-•]\s+(.*)$/gim,
            "• $1"
        );


    formatted =
        formatted.replace(
            /[#*_]/g,
            ""
        );


    formatted =
        formatted.replace(
            /\n/g,
            "<br>"
        );


    return formatted;

}


/* =========================================================
   ADD TEXT MESSAGE
========================================================= */

function addAIMessage(text, role = "assistant"){

    if(!aiMessages){

        return;

    }


    const wrapper =
        document.createElement("div");

    wrapper.className =
        `ai-message ${role}`;


    const bubble =
        document.createElement("div");

    bubble.className =
        "ai-bubble";

    bubble.innerHTML =
        formatAIText(text);


    wrapper.appendChild(
        bubble
    );

    aiMessages.appendChild(
        wrapper
    );


    aiMessages.scrollTop =
        aiMessages.scrollHeight;

}


/* =========================================================
   ADD FILE MESSAGE
========================================================= */

function addAIFileMessage(
    fileData,
    role = "user"
){

    if(
        !aiMessages ||
        !fileData
    ){

        return;

    }


    const wrapper =
        document.createElement("div");

    wrapper.className =
        `ai-message ${role}`;


    const bubble =
        document.createElement("div");

    bubble.className =
        "ai-bubble ai-file-message";


    const mimeType =
        fileData.mimeType ||
        "application/octet-stream";

    const fileName =
        fileData.name ||
        "Attached file";

    const base64Data =
        fileData.data;


    /* IMAGE */

    if(
        mimeType.startsWith("image/") &&
        base64Data
    ){

        const img =
            document.createElement("img");

        img.src =
            `data:${mimeType};base64,${base64Data}`;

        img.className =
            "ai-message-image";

        img.alt =
            fileName;

        img.loading =
            "eager";


        bubble.appendChild(img);


        const name =
            document.createElement("div");

        name.className =
            "ai-file-name";

        name.textContent =
            fileName;

        bubble.appendChild(name);

    }


    /* PDF */

    else if(
        mimeType ===
        "application/pdf"
    ){

        bubble.innerHTML = `

            <div class="ai-pdf-message">

                <div class="ai-pdf-message-icon">
                    📄
                </div>

                <div class="ai-pdf-message-info">

                    <strong>
                        ${escapeAIFileName(fileName)}
                    </strong>

                    <small>
                        PDF
                    </small>

                </div>

            </div>

        `;

    }


    /* OTHER FILE */

    else{

        bubble.innerHTML = `

            <div class="ai-other-file-message">

                <div class="ai-file-message-icon">
                    📎
                </div>

                <div>

                    <strong>
                        ${escapeAIFileName(fileName)}
                    </strong>

                </div>

            </div>

        `;

    }


    wrapper.appendChild(
        bubble
    );

    aiMessages.appendChild(
        wrapper
    );


    aiMessages.scrollTop =
        aiMessages.scrollHeight;

}


/* =========================================================
   ADD GENERATED IMAGE
========================================================= */

function addAIImageMessage(
    imageData,
    mimeType = "image/png"
){

    if(
        !aiMessages ||
        !imageData
    ){

        return;

    }


    const wrapper =
        document.createElement("div");

    wrapper.className =
        "ai-message assistant";


    const card =
        document.createElement("div");

    card.className =
        "ai-generated-image";


    const image =
        document.createElement("img");

    image.src =
        `data:${mimeType};base64,${imageData}`;

    image.alt =
        "StudyMate AI generated image";

    image.loading =
        "lazy";

    image.dataset.image =
        imageData;

    image.dataset.mimeType =
        mimeType;


    /*
     * Open image viewer when image is tapped.
     */

    image.addEventListener(
        "click",
        function(){

            openAIImageViewer(
                image.src,
                "StudyMate AI image"
            );

        }
    );


    const label =
        document.createElement("div");

    label.className =
        "ai-image-label";

    label.textContent =
        "✨ Generated by StudyMate AI";


    const actions =
        document.createElement("div");

    actions.className =
        "ai-image-actions";


    /* DOWNLOAD */

    const download =
        document.createElement("button");

    download.type =
        "button";

    download.textContent =
        "⬇️ Download";

    download.onclick =
        () => downloadAIImage(download);


    /* SHARE */

    const share =
        document.createElement("button");

    share.type =
        "button";

    share.textContent =
        "📤 Share";

    share.onclick =
        () => shareAIImage(share);


    /* AGAIN */

    const regenerate =
        document.createElement("button");

    regenerate.type =
        "button";

    regenerate.textContent =
        "🔄 Again";

    regenerate.onclick =
        regenerateLastAIImage;


    /* DELETE */

    const remove =
        document.createElement("button");

    remove.type =
        "button";

    remove.textContent =
        "🗑️";

    remove.title =
        "Remove image";

    remove.onclick =
        function(){

            card.remove();

            studyMateAIHistory =
                studyMateAIHistory.filter(
                    message =>
                        !(
                            message.type === "image" &&
                            message.image === imageData
                        )
                );

            saveAIHistory();

            saveCurrentChat();

        };


    actions.appendChild(download);

    actions.appendChild(share);

    actions.appendChild(regenerate);

    actions.appendChild(remove);


    card.appendChild(image);

    card.appendChild(label);

    card.appendChild(actions);

    wrapper.appendChild(card);

    aiMessages.appendChild(wrapper);


    aiMessages.scrollTop =
        aiMessages.scrollHeight;

}


/* =========================================================
   REGENERATE IMAGE
========================================================= */

function regenerateLastAIImage(){

    const lastRequest =
        [...studyMateAIHistory]
            .reverse()
            .find(
                message =>
                    message.role === "user" &&
                    message.text &&
                    message.text.startsWith(
                        "🎨 Create an image:"
                    )
            );


    if(!lastRequest){

        return;

    }


    const prompt =
        lastRequest.text
            .replace(
                "🎨 Create an image:",
                ""
            )
            .trim();


    if(
        !canUseAI()
    ){

        showAIPremiumModal();

        return;

    }


    generateAIImage(
        prompt,
        true
    );

}

/* =========================================================
   TYPING
========================================================= */

function showAITyping(){

    if(aiTyping){

        aiTyping.style.display =
            "flex";

    }

    if(aiMessages){

        aiMessages.scrollTop =
            aiMessages.scrollHeight;

    }

}


function hideAITyping(){

    if(aiTyping){

        aiTyping.style.display =
            "none";

    }

}


/* =========================================================
   IMAGE REQUEST DETECTION
========================================================= */

function isImageGenerationRequest(text){

    if(!text){

        return false;

    }


    const message =
        text
            .toLowerCase()
            .trim();


    const phrases = [

        "generate an image",

        "generate a picture",

        "generate image",

        "generate picture",

        "create an image",

        "create a picture",

        "create image",

        "create picture",

        "make an image",

        "make a picture",

        "make image",

        "make picture",

        "draw an image",

        "draw a picture",

        "draw me",

        "draw ",

        "show me an image",

        "show me a picture",

        "visualize this",

        "illustrate this",

        "illustrate "

    ];


    return phrases.some(
        phrase =>
            message.includes(phrase)
    );

}


/* =========================================================
   GENERATE AI IMAGE
========================================================= */

async function generateAIImage(
    prompt,
    countUsage = true
){

    if(!prompt){

        return;

    }


    if(
        countUsage &&
        !canUseAI()
    ){

        showAIPremiumModal();

        return;

    }


    if(aiImageButton){

        aiImageButton.disabled =
            true;

    }


    if(aiStatus){

        aiStatus.textContent =
            "● Creating image...";

        aiStatus.style.color =
            "#c084fc";

    }


    showAITyping();


    try{

        const response =
            await fetch(
                STUDYMATE_IMAGE_URL,
                {

                    method: "POST",

                    headers:{
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify({
                            prompt: prompt
                        })

                }
            );


        const data =
            await response.json();


        if(!response.ok){

            throw new Error(
                data.error ||
                "Image generation failed."
            );

        }


        if(
            !data.success ||
            !data.image
        ){

            throw new Error(
                data.error ||
                "The image provider returned no image."
            );

        }


        const mimeType =
            data.mimeType ||
            "image/png";


        hideAITyping();


        addAIImageMessage(
            data.image,
            mimeType
        );


        /*
         * Count successful image generation.
         */

        if(countUsage){

            recordAIUsage();

        }


        studyMateAIHistory.push({

            role:
                "assistant",

            type:
                "image",

            image:
                data.image,

            mimeType:
                mimeType,

            text:
                "🎨 Generated image"

        });


        saveAIHistory();

        saveCurrentChat();

        renderAIHistory();


    }

    catch(error){

        console.error(
            "StudyMate image error:",
            error
        );


        hideAITyping();


        const message =
            "⚠️ I couldn't generate that image right now. The image service may be unavailable or out of credits.";


        addAIMessage(
            message,
            "assistant"
        );


        studyMateAIHistory.push({

            role:
                "assistant",

            text:
                message

        });


        saveAIHistory();

        saveCurrentChat();

    }


    finally{

        hideAITyping();


        if(aiStatus){

            aiStatus.textContent =
                "● Online";

            aiStatus.style.color =
                "#86efac";

        }


        if(aiImageButton){

            aiImageButton.disabled =
                false;

        }

    }

}


/* =========================================================
   SEND AI MESSAGE
========================================================= */

async function sendAIMessage(
    forceImage = false
){

    /*
     * Check limit BEFORE doing anything.
     */

    if(!canUseAI()){

        showAIPremiumModal();

        return;

    }


    if(!aiInput){

        return;

    }


    const question =
        aiInput.value.trim();

    const attachedFile =
        studyMateAIFile;


    if(
        !question &&
        !attachedFile
    ){

        return;

    }


    if(
        aiSend &&
        aiSend.disabled
    ){

        return;

    }


    /* =====================================================
       CREATE CHAT IF NEEDED
    ===================================================== */

    if(!currentChatId){

        const chat = {

            id:
                createChatId(),

            title:
                generateChatTitle(
                    question ||
                    attachedFile?.name ||
                    "File Conversation"
                ),

            messages: [],

            created:
                Date.now(),

            updated:
                Date.now()

        };


        studyMateChats.unshift(
            chat
        );

        currentChatId =
            chat.id;


        localStorage.setItem(
            "studyMateCurrentChatId",
            currentChatId
        );


        saveStudyMateChats();

    }


    /* =====================================================
       REMOVE WELCOME
    ===================================================== */

    if(aiMessages){

        const welcome =
            aiMessages.querySelector(
                ".ai-welcome"
            );

        if(welcome){

            welcome.remove();

        }

    }


    /* =====================================================
       READ FILE BEFORE CLEARING
    ===================================================== */

    let encodedFile = null;


    if(attachedFile){

        try{

            encodedFile =
                await fileToBase64(
                    attachedFile
                );

        }

        catch(error){

            console.error(
                "Attachment error:",
                error
            );

            addAIMessage(
                "⚠️ I couldn't read that attachment. Please try again.",
                "assistant"
            );

            return;

        }

    }


    /* =====================================================
       DETERMINE IMAGE REQUEST
    ===================================================== */

    const imageRequest =
        !attachedFile &&
        (
            forceImage ||
            isImageGenerationRequest(
                question
            )
        );


    /* =====================================================
       SHOW USER MESSAGE
    ===================================================== */

    if(question){

        addAIMessage(
            imageRequest
                ? `🎨 Create an image: ${question}`
                : question,
            "user"
        );

    }


    if(encodedFile){

        addAIFileMessage(
            encodedFile,
            "user"
        );

    }


    /* =====================================================
       SAVE USER MESSAGE
    ===================================================== */

    const userMessage = {

        role:
            "user",

        text:
            imageRequest
                ? `🎨 Create an image: ${question}`
                : question,

        file:
            encodedFile || null

    };


    studyMateAIHistory.push(
        userMessage
    );


    saveAIHistory();


    updateCurrentChatTitle(
        question ||
        attachedFile?.name ||
        "File Conversation"
    );


    saveCurrentChat();


    renderAIHistory();


    /* =====================================================
       CLEAR INPUT
    ===================================================== */

    aiInput.value =
        "";


    clearAIAttachment();


    if(aiSend){

        aiSend.disabled =
            true;

    }


    /* =====================================================
       IMAGE GENERATION
    ===================================================== */

    if(imageRequest){

        await generateAIImage(
            question,
            true
        );


        if(aiSend){

            aiSend.disabled =
                false;

        }


        if(aiInput){

            aiInput.focus();

        }


        return;

    }


    /* =====================================================
       NORMAL AI CHAT
    ===================================================== */

    showAITyping();


    if(aiStatus){

        aiStatus.textContent =
            "● Thinking...";

        aiStatus.style.color =
            "#facc15";

    }


    try{

        const response =
            await fetch(
                STUDYMATE_AI_URL,
                {

                    method:
                        "POST",

                    headers:{
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify({

                            question:
                                question,

                            mode:
                                currentAIMode,

                            history:
                                studyMateAIHistory,

                            file:
                                encodedFile
                                    ? {
                                        name:
                                            encodedFile.name,

                                        mimeType:
                                            encodedFile.mimeType,

                                        data:
                                            encodedFile.data
                                    }
                                    : null

                        })

                }
            );


        const data =
            await response.json();


        if(!response.ok){

            throw new Error(
                data.error ||
                "AI request failed."
            );

        }


        const answer =
            data.answer ||
            "I couldn't generate a response.";


        hideAITyping();


        /*
         * Successful AI request = one usage.
         */

        recordAIUsage();


        addAIMessage(
            answer,
            "assistant"
        );


        studyMateAIHistory.push({

            role:
                "assistant",

            text:
                answer

        });


        saveAIHistory();

        saveCurrentChat();

        renderAIHistory();


        if(aiStatus){

            aiStatus.textContent =
                "● Online";

            aiStatus.style.color =
                "#86efac";

        }


        console.log(
            "StudyMate AI provider:",
            data.provider
        );

    }


    catch(error){

        console.error(
            "StudyMate AI error:",
            error
        );


        hideAITyping();


        const errorMessage =
            "⚠️ I'm having trouble connecting to my AI brain right now. Please try again in a moment.";


        addAIMessage(
            errorMessage,
            "assistant"
        );


        studyMateAIHistory.push({

            role:
                "assistant",

            text:
                errorMessage

        });


        saveAIHistory();

        saveCurrentChat();


        if(aiStatus){

            aiStatus.textContent =
                "● Connection problem";

            aiStatus.style.color =
                "#f87171";

        }

    }


    finally{

        hideAITyping();


        if(aiSend){

            aiSend.disabled =
                false;

        }


        if(aiInput){

            aiInput.focus();

        }

    }

}


/*=========================================================
   FILE → BASE64
========================================================= */

function fileToBase64(file){

    return new Promise(
        (resolve, reject) => {

            const reader =
                new FileReader();


            reader.onload =
                () => {

                    const result =
                        reader.result;


                    const base64 =
                        result.split(",")[1];


                    resolve({

                        name:
                            file.name,

                        mimeType:
                            file.type,

                        data:
                            base64

                    });

                };


            reader.onerror =
                () => {

                    reject(
                        new Error(
                            "Could not read the file."
                        )
                    );

                };


            reader.readAsDataURL(file);

        }
    );

}


/* =========================================================
   FILE SIZE
========================================================= */

function formatAIFileSize(bytes){

    if(bytes < 1024){

        return `${bytes} B`;

    }


    if(bytes < 1024 * 1024){

        return `${(
            bytes / 1024
        ).toFixed(1)} KB`;

    }


    return `${(
        bytes /
        (1024 * 1024)
    ).toFixed(1)} MB`;

}


/* =========================================================
   SHOW ATTACHMENT PREVIEW
========================================================= */

function showAIAttachment(file){

    if(!aiAttachmentPreview){

        return;

    }


    aiAttachmentPreview.innerHTML = `

        <div class="ai-attachment-info">

            <div
                id="aiAttachmentVisual"
                class="ai-attachment-visual">
            </div>

            <div class="ai-attachment-details">

                <strong>
                    ${escapeAIFileName(file.name)}
                </strong>

                <small>
                    ${formatAIFileSize(file.size)}
                </small>

            </div>

        </div>

        <button
            type="button"
            id="aiRemoveAttachment"
            class="ai-remove-attachment"
            title="Remove attachment"
        >
            ✕
        </button>

    `;


    const visual =
        document.getElementById(
            "aiAttachmentVisual"
        );


    if(!visual){

        return;

    }


    /* IMAGE */

    if(
        file.type &&
        file.type.startsWith("image/")
    ){

        const reader =
            new FileReader();


        reader.onload =
            event => {

                const img =
                    document.createElement(
                        "img"
                    );

                img.src =
                    event.target.result;

                img.className =
                    "ai-attachment-thumbnail";

                img.alt =
                    "Selected image";

                visual.appendChild(
                    img
                );

            };


        reader.readAsDataURL(file);

    }


    /* PDF */

    else if(
        file.type ===
        "application/pdf"
    ){

        visual.innerHTML = `
            <div class="ai-pdf-icon">
                📄
            </div>
        `;

    }


    /* OTHER FILE */

    else{

        visual.innerHTML = `
            <div class="ai-file-icon">
                📎
            </div>
        `;

    }


    aiAttachmentPreview.style.display =
        "flex";


    const removeButton =
        document.getElementById(
            "aiRemoveAttachment"
        );


    if(removeButton){

        removeButton.addEventListener(
            "click",
            clearAIAttachment
        );

    }

}


/* =========================================================
   CLEAR ATTACHMENT
========================================================= */

function clearAIAttachment(){

    studyMateAIFile =
        null;


    if(aiFileInput){

        aiFileInput.value =
            "";

    }


    if(aiAttachmentPreview){

        aiAttachmentPreview.innerHTML =
            "";

        aiAttachmentPreview.style.display =
            "none";

    }

}


/* =========================================================
   ATTACHMENT BUTTON
========================================================= */

if(aiAttachButton){

    aiAttachButton.addEventListener(
        "click",
        function(){

            if(aiFileInput){

                aiFileInput.click();

            }

        }
    );

}


if(aiFileInput){

    aiFileInput.addEventListener(
        "change",
        function(){

            const file =
                aiFileInput.files?.[0];

            if(!file){

                return;

            }

            studyMateAIFile =
                file;

            showAIAttachment(
                file
            );

        }
    );

}


/* =========================================================
   LOAD SAVED MESSAGES
========================================================= */

function renderSavedAIMessages(messages){

    if(!aiMessages){

        return;

    }


    aiMessages.innerHTML =
        "";


    if(
        !Array.isArray(messages) ||
        !messages.length
    ){

        showAIWelcome();

        return;

    }


    messages.forEach(
        message => {

            if(!message){

                return;

            }


            /* IMAGE */

            if(
                message.type === "image" &&
                message.image
            ){

                addAIImageMessage(
                    message.image,
                    message.mimeType ||
                    "image/png"
                );

                return;

            }


            /* USER TEXT + FILE */

            if(
                message.role === "user" &&
                message.file
            ){

                if(message.text){

                    const displayText =
                        message.text.startsWith(
                            "🎨 Create an image:"
                        )
                            ? message.text
                            : message.text;

                    addAIMessage(
                        displayText,
                        "user"
                    );

                }


                addAIFileMessage(
                    message.file,
                    "user"
                );

                return;

            }


            /* NORMAL TEXT */

            if(message.text){

                addAIMessage(
                    message.text,
                    message.role ||
                    "assistant"
                );

            }

        }
    );


    aiMessages.scrollTop =
        aiMessages.scrollHeight;

}


/* =========================================================
   LOAD CHAT
========================================================= */

function loadAIChat(id){

    const chat =
        studyMateChats.find(
            item =>
                item.id === id
        );


    if(!chat){

        return;

    }


    currentChatId =
        chat.id;


    localStorage.setItem(
        "studyMateCurrentChatId",
        currentChatId
    );


    studyMateAIHistory =
        Array.isArray(chat.messages)
            ? [...chat.messages]
            : [];


    saveAIHistory();


    renderSavedAIMessages(
        studyMateAIHistory
    );


    if(aiHistoryPanel){

        aiHistoryPanel.classList.remove(
            "open"
        );

    }

}


/* =========================================================
   DELETE CHAT
========================================================= */

function deleteAIChat(
    event,
    id
){

    if(event){

        event.stopPropagation();

    }


    if(
        !confirm(
            "Delete this conversation?"
        )
    ){

        return;

    }


    studyMateChats =
        studyMateChats.filter(
            chat =>
                chat.id !== id
        );


    saveStudyMateChats();


    if(currentChatId === id){

        currentChatId =
            null;

        studyMateAIHistory =
            [];

        localStorage.removeItem(
            "studyMateCurrentChatId"
        );

        saveAIHistory();

        showAIWelcome();

    }


    renderAIHistory();

}


/* =========================================================
   RENDER HISTORY
========================================================= */

function renderAIHistory(){

    if(!aiHistoryList){

        return;

    }


    aiHistoryList.innerHTML =
        "";


    if(!studyMateChats.length){

        aiHistoryList.innerHTML = `

            <div class="empty-history">

                <div>
                    💬
                </div>

                <h3>
                    No conversations yet
                </h3>

                <p>
                    Your AI conversations
                    will appear here.
                </p>

            </div>

        `;

        return;

    }


    const chats =
        [...studyMateChats].sort(
            (a,b) =>
                (b.updated || 0) -
                (a.updated || 0)
        );


    chats.forEach(
        chat => {

            const item =
                document.createElement(
                    "div"
                );

            item.className =
                "ai-history-item";


            item.addEventListener(
                "click",
                () =>
                    loadAIChat(chat.id)
            );


            const main =
                document.createElement(
                    "div"
                );

            main.className =
                "ai-history-main";


            const title =
                document.createElement(
                    "div"
                );

            title.className =
                "ai-history-title";

            title.textContent =
                chat.title ||
                "New Conversation";


            const date =
                document.createElement(
                    "div"
                );

            date.className =
                "ai-history-date";

            date.textContent =
                new Date(
                    chat.updated ||
                    Date.now()
                ).toLocaleString();


            main.appendChild(title);

            main.appendChild(date);


            const deleteButton =
                document.createElement(
                    "button"
                );

            deleteButton.className =
                "ai-history-delete";

            deleteButton.type =
                "button";

            deleteButton.textContent =
                "🗑";


            deleteButton.addEventListener(
                "click",
                event =>
                    deleteAIChat(
                        event,
                        chat.id
                    )
            );


            item.appendChild(main);

            item.appendChild(
                deleteButton
            );


            aiHistoryList.appendChild(
                item
            );

        }
    );

}


/* =========================================================
   SUGGESTIONS
========================================================= */

function askAISuggestion(question){

    if(
        aiPanel &&
        !aiPanel.classList.contains("show")
    ){

        openStudyMateAI();

    }


    if(!aiInput){

        return;

    }


    aiInput.value =
        question;


    sendAIMessage();

}


/* =========================================================
   OPEN AI
========================================================= */

function openStudyMateAI(){

    if(!aiPanel){

        return;

    }


    const imageViewer =
        document.getElementById(
            "aiImageViewer"
        );


    if(
        imageViewer &&
        imageViewer.classList.contains("open")
    ){

        closeAIImageViewer();

        return;

    }


    if(
        !aiPanel.classList.contains("show")
    ){

        aiNavigationActive =
            true;


        history.pushState(
            {
                studyMateAI: true
            },
            "",
            location.href
        );


        aiPanel.classList.add(
            "show"
        );


        if(aiInput){

            setTimeout(
                () =>
                    aiInput.focus(),
                100
            );

        }

    }

}


/* =========================================================
   CLOSE AI
========================================================= */

function closeStudyMateAI(){

    if(aiPanel){

        aiPanel.classList.remove(
            "show"
        );

    }

}


/* =========================================================
   AI BUTTON
========================================================= */

if(aiButton){

    aiButton.addEventListener(
        "click",
        openStudyMateAI
    );

}


if(aiClose){

    aiClose.addEventListener(
        "click",
        function(){

            closeStudyMateAI();

        }
    );

}


/* =========================================================
   NEW CHAT
========================================================= */

if(aiNewChat){

    aiNewChat.addEventListener(
        "click",
        function(){

            if(
                studyMateAIHistory.length
            ){

                if(
                    !confirm(
                        "Start a new AI chat?"
                    )
                ){

                    return;

                }

            }


            createNewAIChat();

        }
    );

}


/* =========================================================
   SEND BUTTON
========================================================= */

if(aiSend){

    aiSend.addEventListener(
        "click",
        () =>
            sendAIMessage()
    );

}


/*
 * Intentionally NO Enter-to-send.
 */


/* =========================================================
   IMAGE BUTTON
========================================================= */

if(aiImageButton){

    aiImageButton.addEventListener(
        "click",
        function(){

            if(!aiInput){

                return;

            }


            const prompt =
                aiInput.value.trim();


            if(!prompt){

                aiInput.focus();

                return;

            }


            sendAIMessage(
                true
            );

        }
    );

}

/* =========================================================
   FULLSCREEN
========================================================= */

if(aiFullscreen){

    aiFullscreen.addEventListener(
        "click",
        function(){

            if(aiPanel){

                aiPanel.classList.toggle(
                    "fullscreen"
                );

            }

        }
    );

}


/* =========================================================
   HISTORY
========================================================= */

function openAIHistoryDrawer(){

    if(!aiHistoryPanel){

        return;

    }


    if(
        !aiHistoryPanel.classList.contains(
            "open"
        )
    ){

        aiHistoryNavigationActive =
            true;


        history.pushState(
            {
                studyMateAI: true,
                history: true
            },
            "",
            location.href
        );


        aiHistoryPanel.classList.add(
            "open"
        );


        renderAIHistory();

    }

}


if(aiHistoryButton){

    aiHistoryButton.addEventListener(
        "click",
        openAIHistoryDrawer
    );

}


if(closeAIHistory){

    closeAIHistory.addEventListener(
        "click",
        function(){

            if(aiHistoryPanel){

                aiHistoryPanel.classList.remove(
                    "open"
                );

            }

        }
    );

}


if(historyNewChat){

    historyNewChat.addEventListener(
        "click",
        function(){

            if(aiHistoryPanel){

                aiHistoryPanel.classList.remove(
                    "open"
                );

            }


            createNewAIChat();

        }
    );

}


/* =========================================================
   RESTORE CURRENT CHAT
========================================================= */

function loadAIHistory(){

    if(currentChatId){

        const chat =
            studyMateChats.find(
                item =>
                    item.id === currentChatId
            );


        if(chat){

            studyMateAIHistory =
                Array.isArray(
                    chat.messages
                )
                    ? [...chat.messages]
                    : [];


            saveAIHistory();


            renderSavedAIMessages(
                studyMateAIHistory
            );


            return;

        }

    }


    /*
     * Migrate old AI history.
     */

    if(
        studyMateAIHistory.length &&
        !studyMateChats.length
    ){

        const chat = {

            id:
                createChatId(),

            title:
                generateChatTitle(
                    studyMateAIHistory[0]?.text ||
                    "New Conversation"
                ),

            messages:
                [...studyMateAIHistory],

            created:
                Date.now(),

            updated:
                Date.now()

        };


        studyMateChats.unshift(
            chat
        );


        currentChatId =
            chat.id;


        localStorage.setItem(
            "studyMateCurrentChatId",
            currentChatId
        );


        saveStudyMateChats();

    }


    if(studyMateAIHistory.length){

        renderSavedAIMessages(
            studyMateAIHistory
        );

    }

    else{

        showAIWelcome();

    }

}


/* =========================================================
   IMAGE DOWNLOAD
========================================================= */

function downloadAIImage(button){

    const container =
        button.closest(
            ".ai-generated-image"
        );


    if(!container){

        return;

    }


    const image =
        container.querySelector("img");


    if(!image){

        return;

    }


    const imageData =
        image.dataset.image;


    const mimeType =
        image.dataset.mimeType ||
        "image/png";


    const extension =
        mimeType.includes("jpeg")
            ? "jpg"
            : mimeType.includes("webp")
                ? "webp"
                : "png";


    const link =
        document.createElement("a");


    link.href =
        `data:${mimeType};base64,${imageData}`;


    link.download =
        `StudyMate-AI-${Date.now()}.${extension}`;


    document.body.appendChild(
        link
    );


    link.click();


    link.remove();

}


/* =========================================================
   IMAGE SHARE
========================================================= */

async function shareAIImage(button){

    const container =
        button.closest(
            ".ai-generated-image"
        );


    if(!container){

        return;

    }


    const image =
        container.querySelector("img");


    if(!image){

        return;

    }


    try{

        if(
            navigator.share &&
            navigator.clipboard
        ){

            await navigator.share({

                title:
                    "StudyMate AI",

                text:
                    "Generated with StudyMate AI"

            });

            return;

        }

        if(
            navigator.clipboard
        ){

            await navigator.clipboard.writeText(
                image.src
            );

            alert(
                "Image link copied."
            );

        }

    }

    catch(error){

        console.log(
            "Image sharing cancelled."
        );

    }

}


/* =========================================================
   IMAGE VIEWER
========================================================= */

function createAIImageViewer(){

    if(
        document.getElementById(
            "aiImageViewer"
        )
    ){

        return;

    }


    const viewer =
        document.createElement("div");

    viewer.id =
        "aiImageViewer";

    viewer.className =
        "ai-image-viewer";


    viewer.innerHTML = `

        <button
            type="button"
            class="ai-image-viewer-close"
            aria-label="Close image"
        >
            ✕
        </button>

        <img
            id="aiViewerImage"
            src=""
            alt="Full size image"
        >

        <div
            id="aiViewerName"
            class="ai-image-viewer-name"
        ></div>

    `;


    document.body.appendChild(
        viewer
    );


    const closeButton =
        viewer.querySelector(
            ".ai-image-viewer-close"
        );


    if(closeButton){

        closeButton.addEventListener(
            "click",
            closeAIImageViewer
        );

    }


    viewer.addEventListener(
        "click",
        function(event){

            if(
                event.target === viewer
            ){

                closeAIImageViewer();

            }

        }
    );

}


function openAIImageViewer(
    imageSrc,
    imageName = ""
){

    if(!imageSrc){

        return;

    }


    createAIImageViewer();


    const viewer =
        document.getElementById(
            "aiImageViewer"
        );

    const image =
        document.getElementById(
            "aiViewerImage"
        );

    const name =
        document.getElementById(
            "aiViewerName"
        );


    if(
        !viewer ||
        !image
    ){

        return;

    }


    image.src =
        imageSrc;


    image.alt =
        imageName ||
        "StudyMate AI image";


    if(name){

        name.textContent =
            imageName || "";

        name.style.display =
            imageName
                ? "block"
                : "none";

    }


    viewer.classList.add(
        "open"
    );


    document.body.style.overflow =
        "hidden";


    if(!aiImageViewerHistory){

        history.pushState(
            {
                studyMateImageViewer: true
            },
            "",
            location.href
        );

        aiImageViewerHistory =
            true;

    }

}


function closeAIImageViewer(){

    const viewer =
        document.getElementById(
            "aiImageViewer"
        );


    if(!viewer){

        return;

    }


    viewer.classList.remove(
        "open"
    );


    document.body.style.overflow =
        "";


    aiImageViewerHistory =
        false;


    const image =
        document.getElementById(
            "aiViewerImage"
        );


    if(image){

        setTimeout(
            () => {

                if(
                    !viewer.classList.contains(
                        "open"
                    )
                ){

                    image.src =
                        "";

                }

            },
            250
        );

    }

}


/* =========================================================
   ESCAPE IMAGE VIEWER
========================================================= */

document.addEventListener(
    "keydown",
    function(event){

        if(
            event.key === "Escape"
        ){

            closeAIImageViewer();

        }

    }
);


/* =========================================================
   IMAGE VIEWER BACK
========================================================= */

function exitAIImageViewer(){

    if(aiImageViewerHistory){

        history.back();

        return;

    }

    closeAIImageViewer();

}


/* =========================================================
   HISTORY SWIPE
========================================================= */

let historyTouchStartX = 0;

let historyTouchCurrentX = 0;

let historyDragging = false;


if(aiHistoryPanel){

    aiHistoryPanel.addEventListener(
        "touchstart",
        function(event){

            if(
                !event.touches.length
            ){

                return;

            }


            historyTouchStartX =
                event.touches[0].clientX;

            historyTouchCurrentX =
                historyTouchStartX;

            historyDragging =
                true;

        },
        {
            passive: true
        }
    );


    aiHistoryPanel.addEventListener(
        "touchmove",
        function(event){

            if(!historyDragging){

                return;

            }


            historyTouchCurrentX =
                event.touches[0].clientX;

        },
        {
            passive: true
        }
    );


    aiHistoryPanel.addEventListener(
        "touchend",
        function(){

            if(!historyDragging){

                return;

            }


            const distance =
                historyTouchCurrentX -
                historyTouchStartX;


            historyDragging =
                false;


            if(distance > 70){

                aiHistoryPanel.classList.remove(
                    "open"
                );

            }

        },
        {
            passive: true
        }
    );

}


/* =========================================================
   RIGHT EDGE SWIPE → OPEN HISTORY
========================================================= */

let edgeTouchStartX = 0;

let edgeTouchStartY = 0;


document.addEventListener(
    "touchstart",
    function(event){

        if(
            !event.touches.length
        ){

            return;

        }


        edgeTouchStartX =
            event.touches[0].clientX;

        edgeTouchStartY =
            event.touches[0].clientY;

    },
    {
        passive: true
    }
);


document.addEventListener(
    "touchend",
    function(event){

        if(
            !event.changedTouches.length
        ){

            return;

        }


        const endX =
            event.changedTouches[0].clientX;

        const endY =
            event.changedTouches[0].clientY;


        const distance =
            endX -
            edgeTouchStartX;


        const vertical =
            Math.abs(
                endY -
                edgeTouchStartY
            );


        const startedAtEdge =
            edgeTouchStartX >
            window.innerWidth - 35;


        if(
            startedAtEdge &&
            distance < -70 &&
            vertical < 100
        ){

            openAIHistoryDrawer();

        }

    },
    {
        passive: true
    }
);


/* =========================================================
   BACK BUTTON / HISTORY NAVIGATION
========================================================= */
window.addEventListener(
    "popstate",
    function(){

        /*
         * Image viewer has priority.
         */

        const viewer =
            document.getElementById(
                "aiImageViewer"
            );


        if(
            viewer &&
            viewer.classList.contains("open")
        ){

            closeAIImageViewer();

            return;

        }


        /*
         * History drawer.
         */

        if(
            aiHistoryPanel &&
            aiHistoryPanel.classList.contains("open")
        ){

            aiHistoryPanel.classList.remove(
                "open"
            );

            aiHistoryNavigationActive =
                false;

            return;

        }


        /*
         * AI panel.
         */

        if(
            aiPanel &&
            aiPanel.classList.contains("show")
        ){

            aiPanel.classList.remove(
                "show"
            );

            aiNavigationActive =
                false;

        }

    }
);


/* =========================================================
   INITIALIZE STUDYMATE AI
========================================================= */

function initializeStudyMateAI(){

    loadSavedAIData();

    loadAIHistory();

    renderAIHistory();

    updateAIFreeCounter();

    // Premium plans are already initialized above.

}


/* =========================================================
   START
========================================================= */

if(
    document.readyState ===
    "loading"
){

    document.addEventListener(
        "DOMContentLoaded",
        initializeStudyMateAI
    );

}

else{

    initializeStudyMateAI();

}


/* =========================================================
   READY
========================================================= */

console.log(
    "🤖 StudyMate AI loaded successfully."
);