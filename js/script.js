/* =====================================================
   COMPLETE WEBSITE SCRIPT
   Slider + Typewriter + Music + Proposal + Effects
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       1️⃣ SMRITI INFINITE SLIDER
    ===================================================== */

    const track = document.getElementById("sliderTrack");
    let plates = document.querySelectorAll(".plate");
    let index = 0;
    let sliderInterval;

    if (track && plates.length > 0) {

        const firstClone = plates[0].cloneNode(true);
        track.appendChild(firstClone);
        plates = document.querySelectorAll(".plate");

        function showSlide(i) {
            track.style.transition = "transform 1.2s ease-in-out";
            track.style.transform = `translateX(-${i * 100}%)`;

            const typeElement = plates[i].querySelector(".typewriter");
            if (typeElement) startTyping(typeElement);
        }

        function nextSlide() {
            index++;
            showSlide(index);

            if (index === plates.length - 1) {
                setTimeout(() => {
                    track.style.transition = "none";
                    index = 0;
                    track.style.transform = `translateX(0%)`;
                }, 1200);
            }
        }

        function startSlider() {
            sliderInterval = setInterval(nextSlide, 6000);
        }

        function pauseSlider() {
            clearInterval(sliderInterval);
        }

        const container = document.querySelector(".slider-container");

        if (container) {
            container.addEventListener("mouseenter", pauseSlider);
            container.addEventListener("mouseleave", startSlider);
            container.addEventListener("touchstart", pauseSlider);
            container.addEventListener("touchend", startSlider);
        }

        startSlider();
        showSlide(0);
    }


    /* =====================================================
       2️⃣ TYPEWRITER EFFECT
    ===================================================== */

    function startTyping(element) {
        const text = element.getAttribute("data-text");
        element.innerHTML = "";
        let i = 0;
        const speed = 35;

        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }


    /* =====================================================
       3️⃣ SMOOTH MUSIC CROSSFADE
    ===================================================== */

    const heroMusic = document.getElementById("heroMusic");
    const smritiMusic = document.getElementById("smritiMusic");
    const viyogMusic = document.getElementById("viyogMusic");
    const reunionMusic = document.getElementById("reunionMusic");

    const tracks = [heroMusic, smritiMusic, viyogMusic, reunionMusic];
    let activeTrack = null;
    let fadeInterval = null;

    tracks.forEach(track => {
        if (track) {
            track.volume = 0;
            track.loop = true;
        }
    });

    function fadeIn(track) {
        clearInterval(fadeInterval);
        track.play().catch(()=>{});
        let vol = 0;

        fadeInterval = setInterval(() => {
            if (vol < 0.65) {
                vol += 0.01;
                track.volume = vol;
            } else {
                clearInterval(fadeInterval);
            }
        }, 80);
    }

    function fadeOut(track) {
        return new Promise(resolve => {

            clearInterval(fadeInterval);
            let vol = track.volume;

            fadeInterval = setInterval(() => {
                if (vol > 0.02) {
                    vol -= 0.01;
                    track.volume = vol;
                } else {
                    clearInterval(fadeInterval);
                    track.pause();
                    resolve();
                }
            }, 80);
        });
    }

    async function switchTrack(newTrack) {
        if (!newTrack || activeTrack === newTrack) return;

        if (activeTrack) {
            await fadeOut(activeTrack);
        }

        activeTrack = newTrack;
        fadeIn(activeTrack);
    }

    function handleMusicScroll() {

        const smriti = document.getElementById("smriti");
        const viyog = document.getElementById("viyog");
        const reunion = document.getElementById("punarmilan");

        if (!smriti || !viyog || !reunion) return;

        const scrollY = window.scrollY;

        const smritiTop = smriti.offsetTop;
        const viyogTop = viyog.offsetTop;
        const reunionTop = reunion.offsetTop;

        if (scrollY < smritiTop - 200) {
            switchTrack(heroMusic);
        }
        else if (scrollY < viyogTop - 200) {
            switchTrack(smritiMusic);
        }
        else if (scrollY < reunionTop - 200) {
            switchTrack(viyogMusic);
        }
        else {
            switchTrack(reunionMusic);
        }
    }

    window.addEventListener("scroll", handleMusicScroll);

    /* Mobile autoplay fix */
    document.body.addEventListener("click", function initAudio() {
        handleMusicScroll();
        document.body.removeEventListener("click", initAudio);
    });


    /* =====================================================
       4️⃣ PROPOSAL INTERACTION
    ===================================================== */

    const yesBtn = document.getElementById("yesBtn");
    const noBtn = document.getElementById("noBtn");
    const proposalPhase = document.getElementById("proposalPhase");
    const futurePhase = document.getElementById("futurePhase");
    const roseRain = document.getElementById("roseRain");

    /* Dodging NO button */
    if (noBtn) {
        noBtn.addEventListener("mouseover", () => {
            const x = Math.random() * 200 - 100;
            const y = Math.random() * 200 - 100;
            noBtn.style.transform = `translate(${x}px, ${y}px)`;
        });
    }

    /* YES click transition */
    if (yesBtn) {
        yesBtn.addEventListener("click", () => {

            proposalPhase.style.opacity = "0";

            setTimeout(() => {

                proposalPhase.style.display = "none";
                futurePhase.style.display = "block";

                setTimeout(() => {
                    futurePhase.style.opacity = "1";
                }, 100);

                startRoseRain();

            }, 1500);
        });
    }


    /* =====================================================
       5️⃣ ROSE RAIN EFFECT
    ===================================================== */

    function startRoseRain() {

        if (!roseRain) return;

        for (let i = 0; i < 30; i++) {

            const rose = document.createElement("img");
            rose.src = "assets/images/rose.png";
            rose.classList.add("rose");

            rose.style.left = Math.random() * 100 + "vw";
            rose.style.animationDuration = (5 + Math.random() * 3) + "s";

            roseRain.appendChild(rose);

            setTimeout(() => {
                rose.remove();
            }, 8000);
        }
    }

});
