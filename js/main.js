/* ================================
   MAIN.JS - ALL-IN-ONE
================================ */
document.addEventListener("DOMContentLoaded", () => {

  /* ================================
     STAR BACKGROUND
  ================================= */
  const canvas = document.getElementById("stars");
  if(canvas){
    const ctx = canvas.getContext("2d");
    let stars = [];
    let STAR_COUNT = window.innerWidth < 900 ? 60 : 120;

    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    window.addEventListener("resize", ()=>{
      resizeCanvas();
      STAR_COUNT = window.innerWidth < 900 ? 60 : 120;
      createStars();
    });

    resizeCanvas();

    function createStars() {
      stars = [];
      for(let i=0;i<STAR_COUNT;i++){
        stars.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: Math.random() * 1.5 + 0.5,
          speed: Math.random() * 0.3 + 0.1
        });
      }
    }
    createStars();

    function drawStars(){
      ctx.clearRect(0,0,canvas.width,canvas.height);
      ctx.fillStyle = "rgba(255,255,255,0.8)";
      stars.forEach(star=>{
        ctx.beginPath();
        ctx.arc(star.x,star.y,star.r,0,Math.PI*2);
        ctx.fill();
        star.y += star.speed;
        if(star.y > canvas.height){
          star.y = 0;
          star.x = Math.random() * canvas.width;
        }
      });
      requestAnimationFrame(drawStars);
    }
    drawStars();
  }

  /* ================================
     FADE-IN ON SCROLL
  ================================= */
  const faders = document.querySelectorAll(".fade-in");
  const observer = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting) entry.target.classList.add("show");
    });
  }, {threshold:0.15});
  faders.forEach(el=>observer.observe(el));

  /* ================================
     STATS COUNTER
  ================================= */
  const counters = document.querySelectorAll(".counter");
  const counterObserver = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(!entry.isIntersecting) return;
      const counter = entry.target;
      const target = +counter.dataset.target;
      let count = 0;
      const speed = target / 80;
      const update = () => {
        count += speed;
        if(count < target){
          counter.innerText = Math.floor(count);
          requestAnimationFrame(update);
        } else {
          counter.innerText = target;
        }
      };
      update();
      counterObserver.unobserve(counter);
    });
  }, {threshold:0.6});
  counters.forEach(counter=>counterObserver.observe(counter));

  /* ================================
     SKELETON + MESSAGES
  ================================= */
  const skeletonWrapper = document.getElementById("skeleton-wrapper");
  const skeleton = document.getElementById("skeleton");
  const speech = document.getElementById("speech");
  if(skeleton && skeletonWrapper && speech){
    const leftEye = skeleton.querySelector(".eye.left");
    const rightEye = skeleton.querySelector(".eye.right");

    function blinkEyes() {
      [leftEye,rightEye].forEach(eye=>{
        eye.style.transform += " scaleY(0.1)";
      });
      setTimeout(()=>{
        [leftEye,rightEye].forEach(eye=>{
          eye.style.transform = eye.style.transform.replace(" scaleY(0.1)","");
        });
      },150);
      setTimeout(blinkEyes, 2000 + Math.random()*4000);
    }
    blinkEyes();

    const messages = [
      "👋 Need help growing your stream?",
      "💡 Try our AI bots for Twitch!",
      "🎨 Custom overlays to wow your viewers!",
      "🚀 Grow your channel effortlessly!",
      "Want a One Piece themed overlay?",
      "Whatever design you can think of shall be delivered",
      "Want advice on streaming?"
    ];
    let msgIndex = 0;
    let messageInterval;

    function startMessageCycle(){
      clearInterval(messageInterval);
      messageInterval = setInterval(()=>{
        msgIndex = (msgIndex + 1) % messages.length;
        speech.textContent = messages[msgIndex];
      }, 3000);
    }

    function stopMessageCycle(){
      clearInterval(messageInterval);
    }

    skeletonWrapper.addEventListener("mouseenter", ()=>{
      speech.textContent = messages[msgIndex];
      speech.classList.add("show");
      [leftEye,rightEye].forEach(eye=>eye.style.boxShadow="0 0 8px 3px rgba(255,255,255,0.8)");
      startMessageCycle();
    });

    skeletonWrapper.addEventListener("mouseleave", ()=>{
      speech.classList.remove("show");
      [leftEye,rightEye].forEach(eye=>eye.style.boxShadow="none");
      stopMessageCycle();
    });

    skeletonWrapper.addEventListener("click", ()=>{
      speech.textContent = messages[msgIndex];
      speech.classList.add("show");
      startMessageCycle();
      setTimeout(()=>{
        speech.classList.remove("show");
        stopMessageCycle();
      },6000);
    });

    document.addEventListener("mousemove", e=>{
      const skeletonRect = skeleton.getBoundingClientRect();
      const centerX = skeletonRect.left + skeletonRect.width/2;
      const centerY = skeletonRect.top + skeletonRect.height/4;
      const maxOffset = 5;
      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      const angle = Math.atan2(dy, dx);
      const offsetX = Math.cos(angle)*maxOffset;
      const offsetY = Math.sin(angle)*maxOffset;
      leftEye.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
      rightEye.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    });
  }

  /* ================================
     SERVICE SPARKLES
  ================================= */
  document.querySelectorAll(".service-card").forEach(card=>{
    const sparkles = card.querySelectorAll(".sparkles div");
    sparkles.forEach(s=>{
      s.style.left = Math.random()*100+"%";
      s.style.top = Math.random()*100+"%";
      s.style.setProperty("--x", Math.random()*20+"px");
      s.style.setProperty("--y", Math.random()*20+"px");
      s.style.animationDelay = Math.random()*2+"s";
    });
  });

  /* ================================
     MOUSE GLOW
  ================================= */
  const glow = document.getElementById("mouse-glow");
  if(glow){
    document.addEventListener("mousemove", e=>{
      glow.style.transform = `translate(${e.clientX}px,${e.clientY}px)`;
    });
  }

  /* ================================
     LOADER HIDE
  ================================= */
  const loader = document.getElementById("loader");
  window.addEventListener("load", ()=>{
    if(loader){
      loader.style.opacity="0";
      setTimeout(()=>loader.style.display="none",500);
    }
  });

  /* ================================
     PORTFOLIO CAROUSEL - INFINITE + SWIPE
  ================================= */
  const carouselTrack = document.querySelector(".carousel-track");
  if(carouselTrack){
    let startX = 0;
    let index = 0;

    carouselTrack.addEventListener("touchstart", e => startX = e.touches[0].clientX);
    carouselTrack.addEventListener("touchend", e=>{
      const diff = startX - e.changedTouches[0].clientX;
      if(diff>50) index++;
      if(diff<-50) index--;
      index = Math.max(0, Math.min(index, carouselTrack.children.length-1));
      carouselTrack.style.transform = `translateX(${-index*100}%)`;
    });

    if(window.innerWidth>900){
      let autoIndex=0;
      setInterval(()=>{
        autoIndex = (autoIndex+1)%carouselTrack.children.length;
        carouselTrack.style.transform = `translateX(${-autoIndex*100}%)`;
      },5000);
    }
  }

  /* ================================
     CONTACT FORM -> DISCORD WEBHOOK
  ================================= */
  const contactForm = document.getElementById("contact-form");
  const formSuccess = document.getElementById("form-success");
  const formError = document.getElementById("form-error");

  const webhookURL = "https://discord.com/api/webhooks/1456374613297725581/-zPxwQbdJCEfGkThMOJpvu3WOYZTeRYU79cEekSupLUCIE6fMoU94XgsEGsaeR2MxjSp"; // Replace with your webhook

  if(contactForm){
    contactForm.addEventListener("submit", async e=>{
      e.preventDefault();

      const channel = contactForm.channel.value;
      const email = contactForm.email.value;
      const discord = contactForm.discord.value || "Not provided";
      const message = contactForm.message.value || "No additional message";

      const payload = {
        content: `📩 **New Contact Submission**\n**Twitch Channel:** ${channel}\n**Email:** ${email}\n**Discord:** ${discord}\n**Message:** ${message}`
      };

      try{
        await fetch(webhookURL, {
          method: "POST",
          headers: {"Content-Type":"application/json"},
          body: JSON.stringify(payload)
        });
        formSuccess.style.display="block";
        formError.style.display="none";
        contactForm.reset();
        setTimeout(()=>formSuccess.style.display="none",4000);
      } catch(err){
        console.error(err);
        formError.style.display="block";
        formSuccess.style.display="none";
      }
    });
  }

});
