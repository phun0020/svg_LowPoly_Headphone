var headphone = document.getElementById('headphone');
headphone.addEventListener('load', function() {
    var svgDoc = headphone.contentDocument;
    var outlineHeadphone1 = svgDoc.getElementById('outline-headphone1');
    var outlineHeadphone2 = svgDoc.getElementById('outline-headphone2');

    var insideGradient = svgDoc.getElementById('inside-gradient-stop1');
    var iconShape = svgDoc.getElementById('icon');
    var heartDetail = svgDoc.getElementById('detail-heart');

    //animate selector
    var animateToHeart = svgDoc.getElementById('animation-to-heart');
    var animateToPlay = svgDoc.getElementById('animation-to-play');

    // Icon click event
    svgDoc.addEventListener('click', function() {
        // change color inside background
        insideGradient.classList.toggle('change-color-inside-background');

        // -------------------------
        // animate to heart <-> play
        // -------------------------
        if(iconShape.classList.contains('toPlay')) {
            iconShape.classList.remove('toPlay');
            animateToPlay.beginElement();
        }
        else {
            iconShape.classList.add('toPlay');
            animateToHeart.beginElement();
        }

        iconShape.classList.toggle('heart-beat');
        heartDetail.classList.toggle('fade-in'); 
        
        // shaking outline
        outlineHeadphone1.classList.toggle('shake-outline');
        setTimeout(function() { 
            outlineHeadphone2.classList.toggle('shake-outline');     
        }, 250);    
    }, false);


}, false);
