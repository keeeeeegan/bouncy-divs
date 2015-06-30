bouncyDivs.init();
window.addEventListener('resize', bouncyDivs.getWindowDimensions, false);
setInterval(bouncyDivs.animateDivs, 10);
