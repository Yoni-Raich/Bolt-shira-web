# Shira Raich - Architecture Portfolio

## How to Add a New Project

To add a new project to the portfolio, follow these steps to update the `src/content/projects.json` file:

### 1. Project Structure
Each project should follow this structure in the JSON file: 
```json
{
"id": "unique-project-id", // Unique identifier, use kebab-case
"title": "Project Title", // Display name of the project
"location": "City, Country", // Project location
"year": "2024", // Year of completion
"thumbnail": "URL", // Main image URL for projects grid
"heroImage": "URL", // Large header image for project detail page
"description": "Text", // Main project description
"challenge": "Text", // Project challenges
"solution": "Text", // How challenges were addressed
"details": {
"size": "X sq ft", // Project size
"duration": "X months", // Project duration
"completion": "Month YYYY", // Completion date
"client": "Client Name", // Client information
"services": [ // List of services provided
"Service 1",
"Service 2"
]
},
"gallery": [ // Project image gallery
{
"url": "Image URL", // Image URL
"caption": "Image Title", // Short image title
"description": "Text" // Detailed image description
}
]
}
```

### 2. Step-by-Step Guide

1. Open `src/content/projects.json`
2. Locate the `projects` array
3. Add a new project object following the structure above
4. Make sure to:
   - Use a unique `id` for the project
   - Provide valid image URLs
   - Fill in all required fields
   - Follow the exact JSON format (mind the commas!)

### 3. Example Project Entry

```json
{
  "id": "coastal-villa",
  "title": "Coastal Villa Residence",
  "location": "Tel Aviv, Israel",
  "year": "2024",
  "thumbnail": "https://images.unsplash.com/photo-example-1",
  "heroImage": "https://images.unsplash.com/photo-example-2",
  "description": "A contemporary beachfront villa that harmoniously blends indoor and outdoor living spaces.",
  "challenge": "Creating a design that withstands coastal weather while maximizing ocean views.",
  "solution": "Implemented corrosion-resistant materials and innovative window designs to capture panoramic views.",
  "details": {
    "size": "4,200 sq ft",
    "duration": "14 months",
    "completion": "March 2024",
    "client": "Private Residence",
    "services": [
      "Architectural Design",
      "Interior Planning",
      "Coastal Integration",
      "Sustainable Design"
    ]
  },
  "gallery": [
    {
      "url": "https://images.unsplash.com/photo-example-3",
      "caption": "Living Area",
      "description": "Open-plan living space with floor-to-ceiling windows"
    },
    {
      "url": "https://images.unsplash.com/photo-example-4",
      "caption": "Outdoor Terrace",
      "description": "Infinity pool overlooking the Mediterranean"
    }
  ]
}
```

### 4. Image Guidelines

- Use high-quality images (recommended minimum 1920x1080 pixels)
- Ensure you have rights to use the images
- Recommended image hosting:
  - Unsplash (for stock photos)
  - Your own CDN or image hosting service
- Image aspect ratios:
  - Thumbnail: 16:9
  - Hero image: 16:9
  - Gallery images: 4:3

### 5. Validation

After adding a new project:
1. Check that the JSON is valid (use a JSON validator if needed)
2. Run the development server to verify the project appears correctly
3. Test both the main page and the project detail page
4. Verify all images load properly
5. Check mobile responsiveness

### 6. Common Issues

- Missing commas between objects in arrays
- Invalid image URLs
- Missing required fields
- Incorrect JSON formatting
- Special characters in text (use proper escaping)

### 7. Need Help?

If you encounter any issues while adding a new project, please:
1. Verify your JSON syntax
2. Check all image URLs are accessible
3. Ensure all required fields are filled
4. Contact the development team if problems persist
