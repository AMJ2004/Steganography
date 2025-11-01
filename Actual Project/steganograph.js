var operationModeOn = 0;        // 0 - image, 1 - text
var currentMode = 'hide';       // 'hide' or 'extract'
var currentContentType = 'image'; // 'image' or 'text'

console.log('Steganography Tool Initialized');

// Scroll to Section Function - Fixed and Enhanced
function scrollToSection(sectionId) {
    console.log('Attempting to scroll to section:', sectionId);
    
    const section = document.getElementById(sectionId);
    if (section) {
        console.log('Section found, scrolling...');
        
        // Get header height for proper offset
        const header = document.getElementById('header');
        const headerHeight = header ? header.offsetHeight : 0;
        
        // Calculate scroll position
        const sectionTop = section.offsetTop - headerHeight - 20;
        
        console.log('Header height:', headerHeight);
        console.log('Section top:', sectionTop);
        console.log('Section offsetTop:', section.offsetTop);
        
        // Smooth scroll to section
        window.scrollTo({
            top: sectionTop,
            behavior: 'smooth'
        });
        
        console.log('Scrolling to section:', sectionId, 'at position:', sectionTop);
    } else {
        console.error('Section not found:', sectionId);
        // Try alternative method
        const sectionByQuery = document.querySelector('#' + sectionId);
        if (sectionByQuery) {
            console.log('Section found by querySelector, using scrollIntoView...');
            sectionByQuery.scrollIntoView({ 
                behavior: 'smooth',
                block: 'start'
            });
        } else {
            console.error('Section not found by any method:', sectionId);
        }
    }
}

// Test function to verify scrolling works
function testScroll() {
    console.log('Testing scroll function...');
    scrollToSection('main-content');
}

// Enhanced scroll with better error handling
function smoothScrollToSection(sectionId) {
    try {
        scrollToSection(sectionId);
    } catch (error) {
        console.error('Error scrolling to section:', error);
        // Fallback: simple scroll
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
        }
    }
}

// New UI Functions
function switchMode(mode) {
    currentMode = mode;
    
    // Update mode tabs
    document.querySelectorAll('.mode-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    event.target.closest('.mode-tab').classList.add('active');
    
    // Show/hide content
    document.querySelectorAll('.mode-content').forEach(content => {
        content.classList.remove('active');
    });
    
    if (mode === 'hide') {
        document.getElementById('hideContext').classList.add('active');
    } else {
        document.getElementById('extractContext').classList.add('active');
    }
    
    // Reset results
    hideResults();
}

function switchContentType(type) {
    currentContentType = type;
    operationModeOn = (type === 'text') ? 1 : 0;
    
    // Update type tabs
    document.querySelectorAll('.type-tab').forEach(tab => {
        tab.classList.remove('active');
    });
    event.target.closest('.type-tab').classList.add('active');
    
    // Show/hide appropriate input areas
    const imageUpload = document.getElementById('imageUpload');
    const textInput = document.getElementById('textInput');
    
    if (type === 'image') {
        imageUpload.style.display = 'flex';
        textInput.style.display = 'none';
    } else {
        imageUpload.style.display = 'none';
        textInput.style.display = 'block';
    }
    
    // Reset results
    hideResults();
}

function hideResults() {
    document.getElementById('resultsSection').style.display = 'none';
    document.getElementById('extractionResults').style.display = 'none';
}

function showResults() {
    if (currentMode === 'hide') {
        const resultsSection = document.getElementById("resultsSection");
        if (resultsSection) {
            resultsSection.style.display = "block";
            
            // Ensure canvases are visible and properly sized
            const resultCanvas = document.getElementById("resultCanvas");
            const extractionCanvas = document.getElementById("extractionCanvas");
            
            if (resultCanvas) {
                resultCanvas.style.display = "block";
                console.log("Result canvas displayed, dimensions:", resultCanvas.width, "x", resultCanvas.height);
            }
            
            if (extractionCanvas) {
                extractionCanvas.style.display = "block";
                console.log("Extraction canvas displayed, dimensions:", extractionCanvas.width, "x", extractionCanvas.height);
            }
        }
    } else {
        const extractionResults = document.getElementById("extractionResults");
        if (extractionResults) {
            extractionResults.style.display = "block";
            
            // Ensure extract result canvas is visible
            const extractResultCanvas = document.getElementById("extractResultImgCanvas");
            if (extractResultCanvas) {
                extractResultCanvas.style.display = "block";
                console.log("Extract result canvas displayed, dimensions:", extractResultCanvas.width, "x", extractResultCanvas.height);
            }
        }
    }
    
    console.log("Results section displayed for mode:", currentMode);
}

// Text counter functionality
function updateCharCount() {
    const textarea = document.getElementById('textToHide');
    const counter = document.getElementById('charCount');
    if (textarea && counter) {
        counter.textContent = textarea.value.length;
    }
}

// Enhanced text mode function
function textMode(){
    if(operationModeOn == 0){
        //common changes
        document.getElementById("hideIMGcanvas").style.width = "0px";
        document.getElementById("hideIMGcanvas").style.height = "0px";
        document.getElementById("hideIMG").style.width = "0px";
        document.getElementById("hd").style.visibility = "hidden";
        document.getElementById("extractResultImgCanvas").style.width = "0px";
        document.getElementById("extractResultImgCanvas").style.height = "0px";
        document.getElementById("afterExtracting").innerHTML = " ";
        document.getElementById("extraction").style.visibility = "hidden";
        document.getElementById("downloadOriginal").style.visibility = "hidden";
        document.getElementById("downloadExtractedImageInHide").style.visibility = "hidden";
        document.getElementById("extractContext").style.marginTop = "-165vh";
        
        if(currentTask == 0){
            // if hiding then 
        }else{  
            // if extracting then
        }

        operationModeOn = 1;
    }
}

// Enhanced image mode function
function imageMode(){
    if(operationModeOn == 1){
        document.getElementById("hideIMGcanvas").style.width = "97.5%";
        document.getElementById("hideIMGcanvas").style.height = "55vh";
        document.getElementById("hideIMG").style.width = "70%";
        document.getElementById("hd").style.visibility = "visible";
        document.getElementById("extractResultImgCanvas").style.width = "97.5%";
        document.getElementById("extractResultImgCanvas").style.height = "77vh";
        document.getElementById("afterExtracting").innerHTML = "After extracting above image using my tool, output will be as follows: ";
        document.getElementById("extraction").style.visibility = "visible";
        document.getElementById("downloadOriginal").style.visibility = "visible";
        document.getElementById("downloadExtractedImageInHide").style.visibility = "visible";
        
        if(currentTask == 1){
            document.getElementById("extraction").style.visibility = "hidden";
            document.getElementById("downloadOriginal").style.visibility = "hidden";
        }
        if(currentTask == 0){
            document.getElementById("downloadExtractedImageInHide").style.visibility = "hidden";
        }
        operationModeOn = 0;
    }
}

//  Work with text
    /*
        Fetch text from id: textToHide
        Fetch image from variable startAsVanillaJsImage which must be updated each time
    */
   function clear3bits(colorVal){
        return Math.floor(colorVal/8) * 8;
   }
   function clear2bits(colorVal){
       return Math.floor(colorVal/4) * 4;
   }

    function steganographText(){
        var textToHide = document.getElementById("textToHide").value;

        textToHide = '&^--St4$:)[' + textToHide + ']:-($8Ts--^&';
        console.log("Text to hide: "+textToHide);

        var resultImg = new SimpleImage(start.getWidth(), start.getHeight());
        var idx = 0;
        var charCode;
        var r1, r2;
        var left2, middle3, right3;
        for(var pixelResult of resultImg.values()){
            var pixel = start.getPixel(pixelResult.getX(), pixelResult.getY());

            if(idx < textToHide.length){
                charCode = textToHide.charCodeAt(idx);
                r1 = Math.floor(charCode%8);
                right3 = r1;

                r2 = Math.floor(charCode % 64 - r1);
                middle3 = Math.floor(r2/8);

                left2 = Math.floor(( charCode % 256 - r2 ) / 64);
                //console.log(charCode);
                //var value = left2*64 + middle3*8 + right3;
                //console.log('decrypted:'+value);
                //console.log('Pixel at x, '+pixelResult.getX()+' y, '+pixelResult.getY());
                //console.log(clear2bits(pixel.getRed())+left2);
                //console.log(clear3bits(pixel.getGreen())+middle3);
                //console.log(clear3bits(pixel.getBlue())+right3);
                //console.log(' ');
                
                console.log('lmr: '+left2+' '+middle3+' '+right3);
                pixelResult.setRed(clear2bits(pixel.getRed())+left2);
                pixelResult.setGreen(clear3bits(pixel.getGreen())+middle3);
                pixelResult.setBlue(clear3bits(pixel.getBlue())+right3);
                //console.log('At'+pixelResult.getX()+' '+pixelResult.getY()+'pixels RGB:'+pixelResult.getRed()+' '+pixelResult.getGreen()+' '+pixelResult.getBlue());
        
            }else{
                pixelResult.setRed(pixel.getRed());
                pixelResult.setGreen(pixel.getGreen());
                pixelResult.setBlue(pixel.getBlue());

            }
            idx++;
        }
        var pixel = resultImg.getPixel(0,0);
        console.log('At 0,0 pixels RGB:'+pixel.getRed()+' '+pixel.getGreen()+' '+pixel.getBlue());
        var pixel = resultImg.getPixel(1,0);
        console.log('At 1,0 pixels RGB:'+pixelResult.getRed()+' '+pixelResult.getGreen()+' '+pixelResult.getBlue());
        //resultImg.drawTo(document.getElementById("resultCanvas"));
        //givenImage = resultImg;
        //extractText();
        return resultImg;
        /*
        var resultCanvas= document.getElementById("resultCanvas");
        var resultContext = resultCanvas.getContext('2d');
        resultContext.drawImage(imgObj,0,0);
        */
        // set img srcForResult to canvas resultCanvas
    }

    function extractText(){
        try {
            if (!givenImage) {
                throw new Error("No image provided for text extraction");
            }
            
            var extracted = '';
            var left2bits, middle3, right3;
            var value;
            var iterations=0;
            var shouldCheck = true;
            
            console.log("Starting text extraction from image...");
            
            for(var pixel of givenImage.values()){
                iterations++;
                left2bits = pixel.getRed() % 4;
                middle3 = pixel.getGreen() % 8;
                right3 = pixel.getBlue() % 8;
                
                if (iterations <= 5) { // Only log first few pixels for debugging
                    console.log('Pixel', iterations, 'RGB:', pixel.getRed(), pixel.getGreen(), pixel.getBlue(), 'LMR:', left2bits, middle3, right3);
                }
                
                value = left2bits*64 + middle3*8 + right3;
                if(value <= 255 && value >= 0){
                    var char = String.fromCharCode(value);
                    extracted = extracted + char;
                    
                    if (iterations <= 5) {
                        console.log('Extracted char:', value, '->', char);
                    }
                }
                
                if(shouldCheck && iterations > 15){
                    if(extracted.includes('&^--St4$:)[')){
                        shouldCheck = false;
                        console.log("Found start marker, continuing extraction...");
                    } else {
                        console.log("No start marker found after 15 pixels");
                        return 'Invalid photo, not a product from our site';
                    }
                }
                
                if(extracted.includes("]:-($8Ts--^&")){
                    console.log("Found end marker, extraction complete");
                    break;
                }
                
                // Safety check to prevent infinite loops
                if (iterations > 10000) {
                    console.log("Reached maximum iterations, stopping extraction");
                    break;
                }
            }
            
            if (extracted.includes('&^--St4$:)[') && extracted.includes("]:-($8Ts--^&")) {
                extracted = extracted.substring(11, extracted.length-12);
                console.log('Text extraction successful. Output:', extracted);
                return extracted;
            } else {
                console.log("No valid text markers found in image");
                return 'No hidden text found in this image';
            }
            
        } catch (error) {
            console.error("Text extraction error:", error);
            return 'Error extracting text: ' + error.message;
        }
    }
//  Work with text


var coverChanged = 0;
var start;
var hide;
var startAsVanillaJsImage;
var extractFromAsVanillaJsImage;
// 0 -> hide ,  1 -> extract
// By default task: hiding
var currentTask = 0;

function hideMode(){
    if(currentTask == 1){
        document.getElementById("extractContext").style.visibility = "hidden";
        document.getElementById("hideContext").style.visibility = "visible";
        document.getElementById("extraction").style.visibility = "visible";
        document.getElementById("downloadOriginal").style.visibility = "visible";
        document.getElementById("downloadExtractedImageInHide").style.visibility = "hidden";
        currentTask = 0;
    }
    if(operationModeOn == 1){
        document.getElementById("afterExtracting").innerHTML = " ";
        document.getElementById("extraction").style.visibility = "hidden";
        document.getElementById("downloadOriginal").style.visibility = "hidden";
    }

}
function extractMode(){
    if(currentTask == 0){
        document.getElementById("hideContext").style.visibility = "hidden";
        document.getElementById("extractContext").style.visibility = "visible";
        document.getElementById("extraction").style.visibility = "hidden";
        document.getElementById("downloadOriginal").style.visibility = "hidden";
        document.getElementById("downloadExtractedImageInHide").style.visibility = "visible";
        
        document.getElementById("extractContext").style.marginTop = "-165vh";
        
        currentTask = 1;
    }

}
function fetchSuitableWidthForCanvas(ImageHeight, ImageWidth, CanvasHeight){
    var ratio = CanvasHeight/ImageHeight;
    var result = ratio*ImageWidth;
    return result+"vh";
}
function fetchSuitableWidthForForm(ImageHeight, ImageWidth, CanvasHeight){
    var ratio = CanvasHeight/ImageHeight;
    var result = ratio*ImageWidth;
    result = result + 2;
    return result+"vh";
}
//
function uploadHIDE(){
    try {
        var hideCanvas = document.getElementById("hideIMGcanvas");
        var hideImageHolder = document.getElementById("hideIMG");
        
        if (!hideImageHolder.files || !hideImageHolder.files[0]) {
            alert("Please select an image file first!");
            return;
        }
        
        hide = new SimpleImage(hideImageHolder);
        hide.drawTo(hideCanvas);
        
        // Show canvas and hide overlay
        hideCanvas.style.display = "block";
        hideCanvas.nextElementSibling.style.display = "none";
        
        console.log("Hide image uploaded successfully, dimensions:", hide.getWidth(), "x", hide.getHeight());
    } catch (error) {
        console.error("Error uploading hide image:", error);
        alert("Error uploading image. Please try again.");
    }
}

//console.log(steg);
var imgdatauri;
function readURL(input){
    if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function(e) {
        imgdatauri = e.target.result;
        console.log("imgdatauri(original):");
        console.log(imgdatauri);
      };
    }
    reader.readAsDataURL(input.files[0]);
}
function uploadINSIDE(inputForTextHandling){
    try {
        var startCanvas = document.getElementById("inthisIMGcanvas");
        var coverHolder = document.getElementById("inthisIMG");
        
        if (!coverHolder.files || !coverHolder.files[0]) {
            alert("Please select a cover image file first!");
            return;
        }
        
        start = new SimpleImage(coverHolder);
        var h = start.getHeight();
        var w = start.getWidth();
        start.drawTo(startCanvas);
        
        // Show canvas and hide overlay
        startCanvas.style.display = "block";
        startCanvas.nextElementSibling.style.display = "none";
        
        console.log("Cover image uploaded successfully, dimensions:", w, "x", h);
    } catch (error) {
        console.error("Error uploading cover image:", error);
        alert("Error uploading cover image. Please try again.");
    }
}

//



function loadCover(){
    var startCanvas = document.getElementById("inthisIMGcanvas");
    start = new SimpleImage("../../static/Photos/originalCover.jpg");
    start.drawTo(startCanvas);
    
    // Show canvas and hide overlay
    startCanvas.style.display = "block";
    startCanvas.nextElementSibling.style.display = "none";
}


function cropIMGs(){
    // crop simple images
    // start = cropped start
    // hide = cropped hide
    var x, y;
    
    var croppedHeight = hide.getHeight();
    var croppedWidth = hide.getWidth();

    var newCover = new SimpleImage(croppedWidth,croppedHeight);
     for(var pixel of newCover.values()){
   	    x = pixel.getX();
        y = pixel.getY();
        var oldPixel = start.getPixel(x,y);

        pixel.setRed(oldPixel.getRed());
        pixel.setBlue(oldPixel.getBlue());
        pixel.setGreen(oldPixel.getGreen()); 
     }
     start = newCover;
}

function clearBits(colorval){
    // Zero out the low bits
    var x = Math.floor(colorval/16) * 16;
    return x;
}
function chop2hide(image){
    // Iterate over each pixel
    for(var pixel of image.values()){
        // Clear low bits of the red, blue & green
        pixel.setRed(clearBits(pixel.getRed()));
        pixel.setGreen(clearBits(pixel.getGreen()));
        pixel.setBlue(clearBits(pixel.getBlue()));
    }
    return image;
}
function shift(image){
    // Iterate over each pixel & shift most significant bits to least significant positions
    for(var pixel of image.values()){
        pixel.setRed(pixel.getRed()/16);
        pixel.setGreen(pixel.getGreen()/16);
        pixel.setBlue(pixel.getBlue()/16);
    }
    return image;
}
function combine(show, hide){
    // do try cropping
    var answer = new SimpleImage(show.getWidth(), show.getHeight());
    
    for(var pixel of answer.values()){
        var x = pixel.getX();
        var y = pixel.getY();
        var showPixel = show.getPixel(x,y);
        var hidePixel = hide.getPixel(x,y);
        pixel.setRed(showPixel.getRed() + hidePixel.getRed());
        pixel.setGreen(showPixel.getGreen() + hidePixel.getGreen());
        pixel.setBlue(showPixel.getBlue() + hidePixel.getBlue());
    }
    return answer;
}
function extract(answer){
    var extracted = new SimpleImage(answer.getWidth(), answer.getHeight());
    var x;
    var y;
    for( var pixel of extracted.values()){
        x = pixel.getX();
        y = pixel.getY();
        var ansPixel = answer.getPixel(x,y);

        pixel.setRed( (ansPixel.getRed()%16) * 16 );
        pixel.setGreen( (ansPixel.getGreen()%16) * 16 );
        pixel.setBlue( (ansPixel.getBlue()%16) * 16 );
    }
    return extracted;
}
function dothestuff(){
    // All canvas obtained
    var resultCanvas = document.getElementById("resultCanvas");
    var extractCanvas = document.getElementById("extractionCanvas");
    // var hideCanvas = document.getElementById("hideIMGcanvas");
    // var startCanvas = document.getElementById("inthisIMGcanvas");

    if(operationModeOn == 1){
        // If text is operation mode:
        var result = steganographText();
        if (resultCanvas) {
            result.drawTo(resultCanvas);
            console.log("Text steganography result drawn to canvas");
        }
        showResults();
        return;
    }

    // Check if required images are loaded
    if (!start || !hide) {
        alert("Please upload both cover image and content to hide first!");
        return;
    }

    // start and hide are already updated every time it is changed

    if(  (hide.getHeight() > start.getHeight()) || (hide.getWidth() > start.getWidth())  ){
        alert("Resoultion of image to be hidden is greater than covering image :(");
        return;
    }
    else if( (hide.getHeight() != start.getHeight()) || (hide.getWidth() != start.getWidth())){
        cropIMGs();
        alert("Cover image cropped to match up the resolution of hidden image !");
    }
        
    

    //if(coverChanged > 0)
    start = chop2hide(start);
    //start.drawTo(resultCanvas);
    //alert("Start chopping done");
    
    hide = shift(hide);
    //hide.drawTo(resultCanvas);
    //alert("hide shifting done");



    var result = combine(start,hide);
    if (resultCanvas) {
        result.drawTo(resultCanvas);
        console.log("Combined result drawn to canvas, dimensions:", resultCanvas.width, "x", resultCanvas.height);
    }
    
    var extracted = extract(result);
    if (extractCanvas) {
        extracted.drawTo(extractCanvas);
        console.log("Extracted preview drawn to canvas, dimensions:", extractCanvas.width, "x", extractCanvas.height);
    }

    var suitableWidthForResultCanvas = fetchSuitableWidthForCanvas(result.getHeight(), result.getWidth(), 72);
    var suitableWidthForExtractedCanvas = fetchSuitableWidthForCanvas(extracted.getHeight(), extracted.getWidth() , 72);

    //alert("result width: "+suitableWidthForResultCanvas+". canvas width: "+suitableWidthForResultCanvas);
    
    if (resultCanvas) {
        resultCanvas.style.width = suitableWidthForResultCanvas;
        resultCanvas.style.height="72vh";
    }
    
    if (extractCanvas) {
        extractCanvas.style.width = suitableWidthForExtractedCanvas;
        extractCanvas.style.height="72vh";
    }
    
    // Update form widths
    const resultForm = document.getElementById("result");
    const extractionForm = document.getElementById("extraction");
    
    if (resultForm) {
        resultForm.style.width = fetchSuitableWidthForForm(result.getHeight(), result.getWidth(), 72);
    }
    
    if (extractionForm) {
        extractionForm.style.width = fetchSuitableWidthForForm(extracted.getHeight(), extracted.getWidth() , 72);
    }
    
    // Show results
    showResults();
}
 

// Extraction code 
var givenImage, extractedImage;

function uploadExtractSrc(inputForExtracting){
    try {
        var givenCanvas = document.getElementById("extractSrcImgCanvas");
        var givenImageHolder = document.getElementById("extractSrcInput");

        if (!givenImageHolder.files || !givenImageHolder.files[0]) {
            alert("Please select an image file first!");
            return;
        }

        // Update file info
        updateFileInfo('extractSrcInput', 'extractFileInfo', 'extractFileName', 'extractFileSize', 'extractStatus');

        givenImage = new SimpleImage(givenImageHolder);
        givenImage.drawTo(givenCanvas);

        // Show canvas and hide overlay
        givenCanvas.style.display = "block";
        givenCanvas.nextElementSibling.style.display = "none";

        console.log("Extraction source image uploaded successfully, dimensions:", givenImage.getWidth(), "x", givenImage.getHeight());
    } catch (error) {
        console.error("Error uploading extraction source image:", error);
        alert("Error uploading image. Please try again.");
    }
}

function doExtraction(){
    console.log("Extraction started, operation mode:", operationModeOn);
    
    // Check if source image is loaded
    if (!givenImage) {
        alert("Please upload a steganographed image first!");
        return;
    }
    
    if(operationModeOn == 1){
        // If text is operation mode:
        console.log("Extracting text from image...");
        try {
            var extractedText = extractText();
            const extractedTextElement = document.getElementById("textResult");
            if (extractedTextElement) {
                extractedTextElement.innerHTML = extractedText;
                console.log("Text extracted successfully:", extractedText);
            }
            
            // Show text result, hide image result
            const imageResult = document.getElementById("imageResult");
            const textResult = document.getElementById("textResult");
            
            if (imageResult) imageResult.style.display = "none";
            if (textResult) textResult.style.display = "block";
            
            showResults();
        } catch (error) {
            console.error("Text extraction error:", error);
            alert("Error extracting text: " + error.message);
        }
        return;
    }

    // Image extraction mode
    console.log("Extracting image from steganographed image...");
    try {
        var extractCanvas = document.getElementById("extractResultImgCanvas");
        if (!extractCanvas) {
            console.error("Extract result canvas not found");
            alert("Extract result canvas not found!");
            return;
        }
        
        extractedImage = extract(givenImage);
        if (extractedImage) {
            extractedImage.drawTo(extractCanvas);
            console.log("Image extracted successfully, dimensions:", extractedImage.getWidth(), "x", extractedImage.getHeight());
            
            // Update canvas dimensions
            extractCanvas.style.height = "75vh";
            extractCanvas.style.width = fetchSuitableWidthForCanvas(extractedImage.getHeight(), extractedImage.getWidth(), 75);
            
            // Update form width
            const extractResultForm = document.getElementById("extractResult");
            if (extractResultForm) {
                extractResultForm.style.width = fetchSuitableWidthForForm(extractedImage.getHeight(), extractedImage.getWidth(), 75);
            }
            
            // Show image result, hide text result
            const imageResult = document.getElementById("imageResult");
            const textResult = document.getElementById("textResult");
            
            if (imageResult) imageResult.style.display = "block";
            if (textResult) textResult.style.display = "none";
            
            showResults();
        } else {
            console.error("Failed to extract image");
            alert("Failed to extract image. The uploaded image may not contain hidden content.");
        }
    } catch (error) {
        console.error("Image extraction error:", error);
        alert("Error extracting image: " + error.message);
    }
}

// Test download function for debugging
function testDownload() {
    console.log("Testing download functionality...");
    
    // Check if canvases exist
    const resultCanvas = document.getElementById("resultCanvas");
    const extractionCanvas = document.getElementById("extractionCanvas");
    
    console.log("Result canvas:", resultCanvas);
    console.log("Extraction canvas:", extractionCanvas);
    
    if (resultCanvas) {
        console.log("Result canvas dimensions:", resultCanvas.width, "x", resultCanvas.height);
        console.log("Result canvas style display:", resultCanvas.style.display);
    }
    
    if (extractionCanvas) {
        console.log("Extraction canvas dimensions:", extractionCanvas.width, "x", extractionCanvas.height);
        console.log("Extraction canvas style display:", extractionCanvas.style.display);
    }
    
    // Try to create a simple test image
    try {
        const testCanvas = document.createElement('canvas');
        testCanvas.width = 100;
        testCanvas.height = 100;
        const ctx = testCanvas.getContext('2d');
        ctx.fillStyle = 'red';
        ctx.fillRect(0, 0, 100, 100);
        
        const downloadLink = document.createElement('a');
        downloadLink.download = 'test_image.png';
        downloadLink.href = testCanvas.toDataURL('image/png');
        
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        
        console.log("Test download successful");
    } catch (error) {
        console.error("Test download failed:", error);
    }
}

// Downloads:
function download() {
    console.log("Download function called");
    try {
        var resultCanvas = document.getElementById("resultCanvas");
        if (!resultCanvas) {
            console.error("Result canvas not found");
            alert("Result canvas not found. Please process an image first.");
            return;
        }
        
        // Check if canvas has content
        if (resultCanvas.width === 0 || resultCanvas.height === 0) {
            console.error("Canvas has no content");
            alert("Canvas has no content. Please process an image first.");
            return;
        }
        
        // Create a temporary download link
        var downloadLink = document.createElement('a');
        downloadLink.download = 'steganographed_image.png';
        
        // Convert canvas to data URL
        var dataURL = resultCanvas.toDataURL('image/png');
        downloadLink.href = dataURL;
        
        // Trigger download
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        
        console.log("Download initiated for steganographed image");
    } catch (error) {
        console.error("Download error:", error);
        alert("Download failed. Please try again. Error: " + error.message);
    }
}

function downloadOriginalIMG(){
    try {
        var extractionCanvas = document.getElementById("extractionCanvas");
        if (!extractionCanvas) {
            console.error("Extraction canvas not found");
            return;
        }
        
        // Create a temporary download link
        var downloadLink = document.createElement('a');
        downloadLink.download = 'extracted_original_image.png';
        
        // Convert canvas to data URL
        var dataURL = extractionCanvas.toDataURL('image/png');
        downloadLink.href = dataURL;
        
        // Trigger download
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        
        console.log("Download initiated for extracted original image");
    } catch (error) {
        console.error("Download error:", error);
        alert("Download failed. Please try again.");
    }
}

function downloadExtractedIMG(){
    try {
        var extractResultCanvas = document.getElementById("extractResultImgCanvas");
        if (!extractResultCanvas) {
            console.error("Extract result canvas not found");
            return;
        }
        
        // Create a temporary download link
        var downloadLink = document.createElement('a');
        downloadLink.download = 'extracted_content.png';
        
        // Convert canvas to data URL
        var dataURL = extractResultCanvas.toDataURL('image/png');
        downloadLink.href = dataURL;
        
        // Trigger download
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        
        console.log("Download initiated for extracted content");
    } catch (error) {
        console.error("Download error:", error);
        alert("Download failed. Please try again.");
    }
}

// Debug function for extraction
function debugExtraction() {
    console.log("=== EXTRACTION DEBUG INFO ===");
    
    // Check if source image is loaded
    if (!givenImage) {
        console.log("❌ No source image loaded");
        alert("No source image loaded. Please upload a steganographed image first.");
        return;
    }
    
    console.log("✅ Source image loaded");
    console.log("Source image dimensions:", givenImage.getWidth(), "x", givenImage.getHeight());
    
    // Check operation mode
    console.log("Operation mode:", operationModeOn, "(0=image, 1=text)");
    
    // Check canvas elements
    const extractSrcCanvas = document.getElementById("extractSrcImgCanvas");
    const extractResultCanvas = document.getElementById("extractResultImgCanvas");
    
    console.log("Source canvas:", extractSrcCanvas);
    console.log("Result canvas:", extractResultCanvas);
    
    if (extractSrcCanvas) {
        console.log("Source canvas display:", extractSrcCanvas.style.display);
        console.log("Source canvas dimensions:", extractSrcCanvas.width, "x", extractSrcCanvas.height);
    }
    
    if (extractResultCanvas) {
        console.log("Result canvas display:", extractResultCanvas.style.display);
        console.log("Result canvas dimensions:", extractResultCanvas.width, "x", extractResultCanvas.height);
    }
    
    // Check result sections
    const extractionResults = document.getElementById("extractionResults");
    const imageResult = document.getElementById("imageResult");
    const textResult = document.getElementById("textResult");
    
    console.log("Extraction results section:", extractionResults);
    console.log("Image result section:", imageResult);
    console.log("Text result section:", textResult);
    
    // Test text extraction
    if (operationModeOn == 1) {
        console.log("Testing text extraction...");
        try {
            const testText = extractText();
            console.log("Text extraction test result:", testText);
        } catch (error) {
            console.error("Text extraction test failed:", error);
        }
    }
    
    // Test image extraction
    if (operationModeOn == 0) {
        console.log("Testing image extraction...");
        try {
            const testImage = extract(givenImage);
            if (testImage) {
                console.log("Image extraction test successful, dimensions:", testImage.getWidth(), "x", testImage.getHeight());
            } else {
                console.log("Image extraction test failed - no result");
            }
        } catch (error) {
            console.error("Image extraction test failed:", error);
        }
    }
    
    console.log("=== END DEBUG INFO ===");
}

// Initialize the UI when page loads
// Enhanced Dark Mode Toggle
function toggleDarkMode() {
    const body = document.body;
    const themeIcon = document.getElementById('themeIcon');
    const currentTheme = body.getAttribute('data-theme');
    
    if (currentTheme === 'dark') {
        body.removeAttribute('data-theme');
        themeIcon.className = 'fa fa-moon-o';
        localStorage.setItem('theme', 'light');
        console.log('Switched to light mode');
        
        // Update any additional elements that need light mode styling
        updateThemeElements('light');
    } else {
        body.setAttribute('data-theme', 'dark');
        themeIcon.className = 'fa fa-sun-o';
        localStorage.setItem('theme', 'dark');
        console.log('Switched to dark mode');
        
        // Update any additional elements that need dark mode styling
        updateThemeElements('dark');
    }
}

// Initialize theme from localStorage with enhanced support
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.setAttribute('data-theme', 'dark');
        const themeIcon = document.getElementById('themeIcon');
        if (themeIcon) {
            themeIcon.className = 'fa fa-sun-o';
        }
        updateThemeElements('dark');
    } else {
        updateThemeElements('light');
    }
}

// Update theme-specific elements
function updateThemeElements(theme) {
    // Update any custom elements that need theme-specific styling
    const elements = document.querySelectorAll('[data-theme-element]');
    elements.forEach(element => {
        if (theme === 'dark') {
            element.classList.add('dark-theme');
        } else {
            element.classList.remove('dark-theme');
        }
    });
    
    // Force refresh of any CSS custom properties
    document.documentElement.style.setProperty('--current-theme', theme);
    
    // Update any iframes or embedded content if needed
    const iframes = document.querySelectorAll('iframe');
    iframes.forEach(iframe => {
        try {
            iframe.contentWindow.postMessage({ type: 'theme-change', theme: theme }, '*');
        } catch (e) {
            // Ignore cross-origin errors
        }
    });
}

// Enhanced theme toggle with better error handling
function safeToggleDarkMode() {
    try {
        toggleDarkMode();
    } catch (error) {
        console.error('Error toggling dark mode:', error);
        // Fallback: try to at least update the icon
        const themeIcon = document.getElementById('themeIcon');
        if (themeIcon) {
            const currentTheme = document.body.getAttribute('data-theme');
            if (currentTheme === 'dark') {
                themeIcon.className = 'fa fa-sun-o';
            } else {
                themeIcon.className = 'fa fa-moon-o';
            }
        }
    }
}

// Add event listener for theme toggle with better accessibility
function setupThemeToggle() {
    const themeBtn = document.getElementById('darkModeToggle');
    if (themeBtn) {
        // Remove old onclick and add proper event listener
        themeBtn.removeAttribute('onclick');
        themeBtn.addEventListener('click', safeToggleDarkMode);
        
        // Add keyboard support
        themeBtn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                safeToggleDarkMode();
            }
        });
        
        // Add ARIA labels
        themeBtn.setAttribute('aria-label', 'Toggle dark mode');
        themeBtn.setAttribute('role', 'button');
        themeBtn.setAttribute('tabindex', '0');
    }
}

// Enhanced initialization
document.addEventListener('DOMContentLoaded', function() {
    // Initialize theme
    initializeTheme();
    
    // Setup theme toggle
    setupThemeToggle();
    
    // Verify sections exist for scrolling
    console.log('Verifying sections exist...');
    const mainContent = document.getElementById('main-content');
    const howItWorks = document.getElementById('how-it-works');
    
    if (mainContent) {
        console.log('✅ main-content section found at:', mainContent.offsetTop);
    } else {
        console.error('❌ main-content section NOT found');
    }
    
    if (howItWorks) {
        console.log('✅ how-it-works section found at:', howItWorks.offsetTop);
    } else {
        console.error('❌ how-it-works section NOT found');
    }
    
    // Add event listener for text counter
    const textarea = document.getElementById('textToHide');
    if (textarea) {
        textarea.addEventListener('input', updateCharCount);
    }
    
    // Load default cover image
    loadCover();
    
    // Setup animations
    setupAnimations();
    
    // Animate counters when hero section is visible
    const heroSection = document.getElementById('hero');
    if (heroSection) {
        const heroObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    heroObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        heroObserver.observe(heroSection);
    }
    
    // Add theme change listener for dynamic content
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'childList') {
                // Check if new elements need theme styling
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === 1) { // Element node
                        const themeElements = node.querySelectorAll('[data-theme-element]');
                        themeElements.forEach(element => {
                            const currentTheme = document.body.getAttribute('data-theme');
                            if (currentTheme === 'dark') {
                                element.classList.add('dark-theme');
                            }
                        });
                    }
                });
            }
        });
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
    
    console.log('UI Initialized with section verification');
});

// Progress Bar Functions
function showProgress(containerId, text = 'Processing...') {
    const container = document.getElementById(containerId);
    const progressFill = container.querySelector('.progress-fill');
    const progressText = container.querySelector('.progress-text');
    
    if (container && progressFill && progressText) {
        container.style.display = 'block';
        progressText.textContent = text;
        
        // Animate progress bar
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 15;
            if (progress >= 100) {
                progress = 100;
                clearInterval(interval);
            }
            progressFill.style.width = progress + '%';
        }, 200);
        
        return interval;
    }
    return null;
}

function hideProgress(containerId) {
    const container = document.getElementById(containerId);
    if (container) {
        container.style.display = 'none';
    }
}

// File Management Functions
function updateFileInfo(inputId, fileInfoId, fileNameId, fileSizeId, statusId) {
    const input = document.getElementById(inputId);
    const fileInfo = document.getElementById(fileInfoId);
    const fileName = document.getElementById(fileNameId);
    const fileSize = document.getElementById(fileSizeId);
    const status = document.getElementById(statusId);
    
    if (input.files && input.files[0]) {
        const file = input.files[0];
        
        // Update file info display
        fileName.textContent = file.name;
        fileSize.textContent = formatFileSize(file.size);
        fileInfo.style.display = 'flex';
        
        // Update status
        if (status) {
            status.querySelector('.status-text').textContent = 'Uploaded';
            status.querySelector('.status-dot').className = 'status-dot';
        }
        
        console.log('File uploaded:', file.name, 'Size:', formatFileSize(file.size));
    }
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

function removeHideFile() {
    const input = document.getElementById('hideIMG');
    const fileInfo = document.getElementById('hideFileInfo');
    const status = document.getElementById('hideStatus');
    
    input.value = '';
    fileInfo.style.display = 'none';
    
    if (status) {
        status.querySelector('.status-text').textContent = 'Ready';
        status.querySelector('.status-dot').className = 'status-dot';
    }
    
    // Hide canvas and show overlay
    const canvas = document.getElementById('hideIMGcanvas');
    if (canvas) {
        canvas.style.display = 'none';
        canvas.nextElementSibling.style.display = 'flex';
    }
    
    console.log('Hide file removed');
}

function removeCoverFile() {
    const input = document.getElementById('inthisIMG');
    const fileInfo = document.getElementById('coverFileInfo');
    const status = document.getElementById('coverStatus');

    input.value = '';
    fileInfo.style.display = 'none';

    if (status) {
        status.querySelector('.status-text').textContent = 'Ready';
        status.querySelector('.status-dot').className = 'status-dot';
    }

    // Hide canvas and show overlay
    const canvas = document.getElementById('inthisIMGcanvas');
    if (canvas) {
        canvas.style.display = 'none';
        canvas.nextElementSibling.style.display = 'flex';
    }

    console.log('Cover file removed');
}

function removeExtractFile() {
    const input = document.getElementById('extractSrcInput');
    const fileInfo = document.getElementById('extractFileInfo');
    const status = document.getElementById('extractStatus');

    input.value = '';
    fileInfo.style.display = 'none';

    if (status) {
        status.querySelector('.status-text').textContent = 'Ready';
        status.querySelector('.status-dot').className = 'status-dot';
    }

    // Hide canvas and show overlay
    const canvas = document.getElementById('extractSrcImgCanvas');
    if (canvas) {
        canvas.style.display = 'none';
        canvas.nextElementSibling.style.display = 'flex';
    }

    console.log('Extract file removed');
}

// Enhanced Upload Functions
function uploadHIDE(){
    try {
        var hideCanvas = document.getElementById("hideIMGcanvas");
        var hideImageHolder = document.getElementById("hideIMG");
        
        if (!hideImageHolder.files || !hideImageHolder.files[0]) {
            alert("Please select an image file first!");
            return;
        }
        
        // Update file info
        updateFileInfo('hideIMG', 'hideFileInfo', 'hideFileName', 'hideFileSize', 'hideStatus');
        
        hide = new SimpleImage(hideImageHolder);
        hide.drawTo(hideCanvas);
        
        // Show canvas and hide overlay
        hideCanvas.style.display = "block";
        hideCanvas.nextElementSibling.style.display = "none";
        
        console.log("Hide image uploaded successfully, dimensions:", hide.getWidth(), "x", hide.getHeight());
    } catch (error) {
        console.error("Error uploading hide image:", error);
        alert("Error uploading image. Please try again.");
    }
}

function uploadINSIDE(inputForTextHandling){
    try {
        var startCanvas = document.getElementById("inthisIMGcanvas");
        var coverHolder = document.getElementById("inthisIMG");
        
        if (!coverHolder.files || !coverHolder.files[0]) {
            alert("Please select a cover image file first!");
            return;
        }
        
        // Update file info
        updateFileInfo('inthisIMG', 'coverFileInfo', 'coverFileName', 'coverFileSize', 'coverStatus');
        
        start = new SimpleImage(coverHolder);
        var h = start.getHeight();
        var w = start.getWidth();
        start.drawTo(startCanvas);
        
        // Show canvas and hide overlay
        startCanvas.style.display = "block";
        startCanvas.nextElementSibling.style.display = "none";
        
        console.log("Cover image uploaded successfully, dimensions:", w, "x", h);
    } catch (error) {
        console.error("Error uploading cover image:", error);
        alert("Error uploading cover image. Please try again.");
    }
}

// Enhanced Processing Function
function dothestuff(){
    console.log("Starting steganography process...");
    
    // Show progress
    const progressInterval = showProgress('hideProgress', 'Processing images...');
    
    // Show loading state on button
    const processBtn = document.getElementById('hideProcessBtn');
    const btnLoading = document.getElementById('hideBtnLoading');
    const btnText = processBtn.querySelector('span');
    
    if (processBtn && btnLoading && btnText) {
        btnText.style.display = 'none';
        btnLoading.style.display = 'block';
        processBtn.disabled = true;
    }
    
    // Simulate processing delay for better UX
    setTimeout(() => {
        try {
            // All canvas obtained
            var resultCanvas = document.getElementById("resultCanvas");
            var extractCanvas = document.getElementById("extractionCanvas");

            if(operationModeOn == 1){
                // If text is operation mode:
                var result = steganographText();
                if (resultCanvas) {
                    result.drawTo(resultCanvas);
                    console.log("Text steganography result drawn to canvas");
                }
                showResults();
                hideProgress('hideProgress');
                resetButtonState();
                return;
            }

            // Check if required images are loaded
            if (!start || !hide) {
                alert("Please upload both cover image and content to hide first!");
                hideProgress('hideProgress');
                resetButtonState();
                return;
            }

            // start and hide are already updated every time it is changed
            if(  (hide.getHeight() > start.getHeight()) || (hide.getWidth() > start.getWidth())  ){
                alert("Resoultion of image to be hidden is greater than covering image :(");
                hideProgress('hideProgress');
                resetButtonState();
                return;
            }
            else if( (hide.getHeight() != start.getHeight()) || (hide.getWidth() != start.getWidth())){
                cropIMGs();
                alert("Cover image cropped to match up the resolution of hidden image !");
            }
                
            //if(coverChanged > 0)
            start = chop2hide(start);
            hide = shift(hide);

            var result = combine(start,hide);
            if (resultCanvas) {
                result.drawTo(resultCanvas);
                console.log("Combined result drawn to canvas, dimensions:", resultCanvas.width, "x", resultCanvas.height);
            }
            
            var extracted = extract(result);
            if (extractCanvas) {
                extracted.drawTo(extractCanvas);
                console.log("Extracted preview drawn to canvas, dimensions:", extractCanvas.width, "x", extractCanvas.height);
            }

            var suitableWidthForResultCanvas = fetchSuitableWidthForCanvas(result.getHeight(), result.getWidth(), 72);
            var suitableWidthForExtractedCanvas = fetchSuitableWidthForCanvas(extracted.getHeight(), extracted.getWidth() , 72);
            
            if (resultCanvas) {
                resultCanvas.style.width = suitableWidthForResultCanvas;
                resultCanvas.style.height="72vh";
            }
            
            if (extractCanvas) {
                extractCanvas.style.width = suitableWidthForExtractedCanvas;
                extractCanvas.style.height="72vh";
            }
            
            // Update form widths
            const resultForm = document.getElementById("result");
            const extractionForm = document.getElementById("extraction");
            
            if (resultForm) {
                resultForm.style.width = fetchSuitableWidthForForm(result.getHeight(), result.getWidth(), 72);
            }
            
            if (extractionForm) {
                extractionForm.style.width = fetchSuitableWidthForForm(extracted.getHeight(), extracted.getWidth() , 72);
            }
            
            // Show results
            showResults();
            hideProgress('hideProgress');
            resetButtonState();
            
        } catch (error) {
            console.error("Error in steganography process:", error);
            alert("An error occurred during processing. Please try again.");
            hideProgress('hideProgress');
            resetButtonState();
        }
    }, 1500); // 1.5 second delay for better UX
}

function resetButtonState() {
    const processBtn = document.getElementById('hideProcessBtn');
    const btnLoading = document.getElementById('hideBtnLoading');
    const btnText = processBtn.querySelector('span');
    
    if (processBtn && btnLoading && btnText) {
        btnText.style.display = 'inline';
        btnLoading.style.display = 'none';
        processBtn.disabled = false;
    }
}

// Animated Counter for Stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps
        let current = 0;
        
        const updateCounter = () => {
            current += increment;
            if (current < target) {
                counter.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        
        updateCounter();
    });
}

// Intersection Observer for animations
function setupAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.feature-card, .upload-card, .result-card').forEach(el => {
        observer.observe(el);
    });
}