# Steganography

A Cyber Security Project that demonstrates the technique of hiding information within images using LSB (Least Significant Bit) steganography.

## Project Overview

This is a browser-based steganography website that allows users to:
- Hide images within other images
- Hide text within images
- Extract hidden images or text from steganographed images
- Download the resulting steganographed images

## Technology Stack

| HTML | CSS | JavaScript | Bootstrap | PHP | MySQL |
|------|-----|------------|-----------|-----|-------|
| ✓ | ✓ | ✓ | ✓ | ✓ | ✓ |

## Features

- **Image Steganography**: Hide one image within another using LSB technique
- **Text Steganography**: Hide text messages within images
- **Extraction**: Extract hidden content from steganographed images
- **Responsive Design**: Modern UI with Bootstrap framework
- **Cross-browser Compatibility**: Works across different web browsers
- **File Upload**: Support for various image formats
- **Download Functionality**: Save processed images locally

## Technical Implementation

### Frontend
- **HTML5**: Semantic markup for structure
- **CSS3**: Custom styling with gradients and animations
- **Bootstrap**: Responsive grid system and components
- **JavaScript**: Core steganography algorithms and UI interactions
- **Canvas API**: Image processing and manipulation

### Backend
- **PHP**: Server-side processing and file handling
- **MySQL**: Database integration for storing steganography results
- **File Upload**: Secure handling of image uploads

### Core Algorithms
- **LSB Technique**: Least Significant Bit manipulation for data hiding
- **Image Processing**: Canvas-based image manipulation
- **Data Encoding**: Binary encoding of hidden information
- **Steganalysis**: Detection and extraction of hidden data

## How It Works

1. **Hiding Process**:
   - Upload a cover image and content to hide (image or text)
   - Apply LSB steganography algorithm
   - Generate steganographed image with hidden content
   - Download the result

2. **Extraction Process**:
   - Upload a steganographed image
   - Apply reverse LSB algorithm
   - Extract and display hidden content
   - Download extracted content

## Security Features

- LSB technique provides covert communication
- Support for various image formats
- Secure file handling and validation
- Database integration for result tracking

## Installation

1. Clone the repository
2. Set up a web server with PHP and MySQL support
3. Configure database connection
4. Upload files to web server directory
5. Access through web browser

## Usage

1. Choose operation mode (Hide or Extract)
2. Select content type (Image or Text)
3. Upload required files
4. Process the steganography operation
5. Download results

## Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## License

This project is licensed under the ISC License.

## Author

**Aishwarya Jagdale** - Cyber Security Project Developer

---

*This project demonstrates advanced steganography techniques for educational and research purposes in the field of cyber security.*
