# Kalvium Login Form Assignment

## Project Overview
This is a responsive login form built with HTML, CSS, and JavaScript that demonstrates real-time form validation, user authentication, and modern UI/UX design principles.

## Files Structure
```
login-form/
├── index.html      # Main HTML structure
├── styles.css      # Complete styling and responsive design
├── script.js       # Main JavaScript functionality
└── success.js      # Optional enhancements (bonus features)
```

## Features Implemented

### ✅ Core Requirements
- **Real-time validation**: Email and password validation as user types
- **Edge case handling**: Empty fields, invalid formats, incorrect credentials
- **Hardcoded authentication**: Email: user@kalvium.com, Password: password123
- **Dynamic UI feedback**: Error messages, loading states, success page
- **Responsive design**: Works on desktop, tablet, and mobile devices
- **Clean code**: Well-commented and structured JavaScript

### ✅ Validation Features
- **Email validation**: Uses regex pattern for proper email format
- **Password requirements**: Minimum 6 characters
- **Real-time feedback**: Immediate validation as user types
- **Error prevention**: Form cannot be submitted with invalid data
- **Security**: Password field is cleared on failed login attempt

### ✅ UI/UX Features
- **Modern design**: Clean, professional appearance
- **Loading states**: Button shows spinner during authentication
- **Password toggle**: Show/hide password functionality
- **Smooth animations**: CSS transitions and keyframe animations
- **Accessibility**: Proper labels, ARIA attributes, keyboard navigation
- **Mobile responsive**: Touch-friendly on mobile devices

### ✅ Bonus Features
- **Attempt limits**: Prevents multiple rapid submissions
- **Session management**: Remembers login state
- **Success page**: Welcome message with user email
- **Logout functionality**: Return to login page
- **Keyboard shortcuts**: Enhanced accessibility
- **Auto-logout timer**: Security feature (in success.js)

## How to Use

### Demo Credentials
- **Email**: user@kalvium.com
- **Password**: password123

### Testing the Form
1. Open `index.html` in a web browser
2. Try entering invalid emails to see validation
3. Try short passwords to see length validation
4. Use correct credentials to see success page
5. Test responsive design by resizing browser window

### Development Console
Open browser developer tools and use these helper functions:
- `fillDemoCredentials()` - Auto-fills the form with demo credentials
- `logValidationState()` - Shows current validation state

## Technical Implementation

### HTML Structure
- Semantic HTML5 elements
- Proper form structure with labels
- Accessibility attributes (ARIA)
- SVG icons for better scalability

### CSS Features
- CSS Grid and Flexbox for layout
- CSS Custom Properties (variables) for theming
- Responsive design with media queries
- Modern animations and transitions
- High contrast mode support
- Print stylesheet

### JavaScript Functionality
- Modular code organization
- Real-time validation using event listeners
- Regular expressions for email validation
- Session storage for user state
- Error handling and user feedback
- Accessibility enhancements

## Browser Compatibility
- Modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers (iOS Safari, Chrome Mobile)
- Responsive design works on all screen sizes
- Graceful degradation for older browsers

## Assignment Compliance
This project meets all requirements specified in the Kalvium assignment:
- ✅ Built with only HTML, CSS, and JavaScript
- ✅ No external libraries or frameworks
- ✅ Real-time input validation
- ✅ Hardcoded authentication logic
- ✅ Handles edge cases and provides user feedback
- ✅ Clean, well-commented code
- ✅ Responsive design
- ✅ Files named as requested: index.html, styles.css, script.js
- ✅ Ready for submission in login-form folder

## Future Enhancements
- Two-factor authentication
- Password strength meter
- Remember me functionality
- Social login options
- Backend integration
- Advanced security features

---
**Developed for Kalvium Assignment | Software Product Engineering**
