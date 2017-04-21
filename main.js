var headphone = document.getElementById('headphone');
headphone.addEventListener('load', () => {
    var svgDoc = headphone.contentDocument;
    var outlineHeadphone1 = svgDoc.getElementById('outline-headphone1');
    var outlineHeadphone2 = svgDoc.getElementById('outline-headphone2');

    var insideGradient = svgDoc.getElementById('inside-gradient-stop1');
    var iconShape = svgDoc.getElementById('icon');
    var heartDetail = svgDoc.getElementById('detail-heart');

    // animate selector
    var animateToHeart = svgDoc.getElementById('animation-to-heart');
    var animateToPlay = svgDoc.getElementById('animation-to-play');

    // audio
    var audio = new Audio('audio/Cold_Heart_Hoaprox_cut.mp3');
    if (typeof audio.loop == 'boolean'){ audio.loop = true; }

    // remove and pause
    var rmAndPause = () => {
        iconShape.classList.remove('heart-beat');
        heartDetail.classList.remove('fade-in');
        audio.pause();
    };

    var addAndPlay = () => {
        iconShape.classList.add('heart-beat');
        heartDetail.classList.add('fade-in');
        audio.play();
    };

    // -------------------------
    // Icon click event
    // -------------------------
    svgDoc.addEventListener('click', () => {
        // change color inside background
        insideGradient.classList.toggle('change-color-inside-background');

        // -------------------------
        // animate to heart <-> play
        // -------------------------
        if(iconShape.classList.contains('toPlay')) {
            audio.currentTime = 0;
            if(iconShape.classList.contains('heart-beat')) {
                rmAndPause();
            }
            iconShape.classList.remove('toPlay');
            animateToPlay.beginElement();
        }
        else {
            iconShape.classList.add('toPlay');
            if(!iconShape.classList.contains('heart-beat')) {
                addAndPlay();
            }
            animateToHeart.beginElement();
        }
        
        // shaking outline
        outlineHeadphone1.classList.toggle('shake-outline');
        setTimeout(() => { 
            outlineHeadphone2.classList.toggle('shake-outline');     
        }, 250);
    }, false);

    // -------------------------
    // Icon hover event
    // -------------------------
    svgDoc.addEventListener('mouseover', (e) => {
        if(iconShape.classList.contains('toPlay')) {
            if(!iconShape.classList.contains('heart-beat')) {
                addAndPlay();
            }
            audio.play();
        }
        else {
            audio.pause();
        }
    }, false)

    svgDoc.addEventListener('mouseout', (e) => {
        if(iconShape.classList.contains('heart-beat')) {
            rmAndPause();            
        }
    }, false);

    // -------------------------
    // loop & replay
    // -------------------------
    audio.addEventListener('ended', () => {
        audio.currentTime = 0;
        audio.play();
    }, false);

}, false);
