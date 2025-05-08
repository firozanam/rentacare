RentaCare : Product Requirements Document (PRD)

1\. Introduction

This document outlines the requirements for a home rental classified web application. The platform will allow landlords to post rental listings for various property types, and users to browse and interact with these listings. The application aims to provide a user-friendly and efficient way for tenants to find suitable rental properties.

2\. Goals

* To create a platform that connects landlords and potential tenants effectively.  
* To provide a comprehensive database of rental properties with detailed information.  
* To offer a seamless user experience for both landlords and tenants.  
* To monetize the platform through listing fees.

3\. Target Audience

* Landlords: Individuals or property managers looking to rent out their houses, apartments, flats, mess accommodations, or mess seats.  
* Tenants: Individuals seeking rental properties.

4\. Product Features

4.1 Landlord Features:

* Profile Creation: Landlords can create profiles with their contact information.  
* Listing Creation:  
  * Ability to post new rental listings with:  
    * Title  
    * Detailed description  
    * Mobile number  
    * Multiple images  
  * Location selection using a hierarchical structure: Division \- District \- Thana \- Village/City \- Area.  
* Listing Fee: A charge of BDT 20 will be applied for each new listing.  
* Dashboard: A dedicated dashboard for landlords to manage their listings.  
* Mark as Rented: A feature to mark a listed property as rented.  
* Listing Management: Ability to edit or delete their active listings.

4.2 User Features:

* Account Creation: Users need to create an account to view listings.  
* Feed Page: A main page displaying all active rental listings in a feed format, similar to Facebook.  
* Location-Based Search Filter: Users can filter listings based on Division, District, Thana, Village/City, and Area to easily find relevant properties.  
* Listing Details: View complete details of a listing, including title, description, images, and landlord's contact number (visible after login).  
* Interaction:  
  * Like listings.  
  * Comment on listings and reply to comments.  
  * Send direct messages to the landlord of a listing.  
* Map Location Sharing: Landlords can share the property location via map in the direct messages.

4.3 General Features:

* Image Handling: Efficient uploading, storage, and display of property images.  
* Notifications: Real-time notifications for new comments, replies, and messages.

5\. Technical Requirements

* Technology Stack:  
  * Backend: PHP Laravel  
  * Frontend: React  
  * Database: MySQL  
  * Real-time Communication: Laravel Reverb (WebSocket)  
  * Payment Gateway: SSLCOMMERZ

6\. Payment Integration

* Integration with SSLCOMMERZ to process the BDT 20 listing fee from landlords.  
* Secure and reliable transaction processing.  
* Record-keeping of successful and failed payments.

7\. User Interface (UI) and User Experience (UX)

* Clean, intuitive, and user-friendly interface for both landlords and tenants.  
* Responsive design to ensure compatibility across different devices (desktop, mobile, tablet).  
* Easy navigation and clear information architecture.  
* Optimized image loading for faster browsing.

8\. Database Design

* Well-structured database schema to efficiently store and retrieve information related to landlords, users, properties, locations, listings, comments, likes, and messages.

9\. Real-time Communication

* Implementation of Laravel Reverb (WebSocket) for real-time features such as:  
  * New comment notifications.  
  * New message notifications.  
  * Real-time updates on the feed (though "Mark as Rented" will remove listings, new listings will appear).

10\. "Mark as Rented" Functionality

* Landlords can mark their listed properties as "rented" from their dashboard.  
* Once marked as rented, the listing will no longer be visible on the main feed page.  
* These marked listings might be stored in an archive section within the landlord's dashboard for their records.

11\. Location-Based Search

* Implementation of a robust search filter that allows users to select specific locations (Division \- District \- Thana \- Village/City \- Area) to find relevant rental listings.  
* Efficient querying of the database based on the selected location criteria.

12\. Security

* Secure user authentication and authorization to protect user data.  
* Protection against common web vulnerabilities (e.g., XSS, SQL injection).  
* Secure handling of payment information through SSLCOMMERZ.

13\. Future Enhancements (Optional)

* Advanced search filters (e.g., price range, property type, number of bedrooms/bathrooms).  
* Featured listings for increased visibility (potentially with a higher fee).  
* User reviews and ratings for landlords.  
* Virtual tours of properties.  
* Integration with map services for visual location representation on listings.

This PRD provides a comprehensive overview of the requirements for your home rental classified web application. As development progresses, this document may be updated and refined. Let me know if you have any specific questions or would like to delve deeper into any of these sections\!

