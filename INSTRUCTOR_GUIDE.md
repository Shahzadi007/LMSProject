# 👨‍🏫 Instructor's Guide to the LMS

Welcome to the Learning Management System! This guide will help you create and manage your courses.

## Getting Started as an Instructor

### Prerequisites
- You must have an Instructor account
- The LMS backend and frontend must be running
- You have permission to create courses

### Account Creation

1. Go to the registration page
2. Fill in your details:
   - Full Name
   - Email address
   - Password (min 6 characters)
   - **Select "Instructor" as your role**
3. Click "Create Account"
4. Login with your credentials

## Dashboard Overview

After logging in with an Instructor account:

1. Click "Instructor" in the navbar
2. You'll see the Instructor Dashboard with quick access to:
   - Create Course
   - Manage Courses
   - Add Lessons

## Creating Your First Course

### Step-by-Step Process

1. **Navigate to Create Course**
   - Click "Instructor" in navbar
   - Click "Create Course" button
   - Or go to: http://localhost:3000/instructor/create

2. **Fill in Course Details**

   **Course Title** (Required)
   - Enter a descriptive title
   - Example: "Web Development 101"
   - Keep it clear and searchable

   **Description** (Required)
   - Provide a detailed course overview
   - Mention what students will learn
   - List key topics covered
   - Example: "Learn HTML, CSS, JavaScript, and React from scratch"

   **Category** (Required)
   - Select from predefined categories:
     - Programming
     - Design
     - Business
     - Marketing
     - General
     - Other

   **Price** (Optional)
   - Leave blank or enter 0 for free course
   - Enter price for paid courses
   - Use numeric values only

3. **Submit the Form**
   - Review all information
   - Click "Create Course" button
   - You'll see a success message
   - You'll be redirected to "Manage Courses"

## Managing Your Courses

### View All Your Courses

1. Click "Instructor" in navbar
2. Click "Manage Courses"
3. You'll see a table with all your courses showing:
   - Course Title
   - Category
   - Price
   - Description preview
   - Action buttons

### Course Actions

For each course, you can:

**View**
- Click "View" button
- See full course details
- View all lessons
- Check enrollment status

**Add Lesson**
- Click "Add Lesson" button
- Create new lesson content
- Upload videos or text
- Organize course materials

**Delete**
- Click "Delete" button
- Confirm deletion
- Course will be removed
- Associated enrollments will be cleared

## Adding Lessons to Your Course

### Access the Lesson Upload

1. Go to Manage Courses
2. Click "Add Lesson" for any course
3. Or navigate to: http://localhost:3000/instructor/upload-lesson

### Lesson Creation Form

**Course ID** (Required)
- You'll need the MongoDB ObjectId of your course
- How to find it:
  1. Go to "Manage Courses"
  2. The Course ID appears in the course details URL
  3. Or check your browser's network tab

**Lesson Title** (Required)
- Give your lesson a clear name
- Example: "Introduction to HTML"
- Make it descriptive for students

**Lesson Content** (Optional)
- Write detailed lesson content
- Can include:
  - Text explanations
  - Bullet points
  - Code snippets
  - Step-by-step instructions
- Supports markdown format
- Students will see this when viewing lessons

**Video URL** (Optional)
- Link to external videos
- Supports:
  - YouTube URLs
  - Vimeo URLs
  - Any video hosting service
- Format: Complete URL including protocol (https://)
- Example: https://youtube.com/watch?v=...

### Submit Lesson

1. Fill all required fields
2. Click "Create Lesson"
3. Success message appears
4. Lesson is added to course
5. Students can now see it

## Best Practices

### Course Creation Tips

✅ **Do:**
- Use clear, descriptive course titles
- Write comprehensive descriptions
- Categorize appropriately
- Organize lessons logically
- Use consistent lesson structure
- Include learning objectives
- Set realistic prices

❌ **Don't:**
- Use vague course titles
- Publish incomplete courses
- Duplicate course content
- Overprice content
- Forget to add lessons
- Use inappropriate images/content

### Lesson Organization Tips

✅ **Good Lesson Flow:**
1. Introduction/Overview
2. Prerequisites
3. Main Content
4. Examples/Demonstrations
5. Exercises/Practice
6. Summary/Review
7. Next Steps

✅ **Content Tips:**
- Keep lessons concise
- Use clear language
- Include code examples
- Add relevant links
- Provide resources
- Break complex topics

### Student Engagement

✅ **Keep Students Interested:**
- Update courses regularly
- Add new lessons frequently
- Respond to questions
- Maintain course quality
- Monitor enrollments
- Gather feedback

## Monitoring Student Progress

### View Student Enrollments

1. Go to Manage Courses
2. Each course shows:
   - Number of enrollments
   - Student list (when viewing course)
   - Progress tracking per student

### Track Analytics

Admin can view:
- Total course enrollments
- Student engagement metrics
- Course popularity
- Enrollment trends

## Troubleshooting

### Course Not Appearing

**Problem:** Course created but not visible
- ✅ Refresh the page
- ✅ Check internet connection
- ✅ Verify MongoDB connection
- ✅ Check browser console for errors

### Cannot Add Lesson

**Problem:** Lesson creation fails
- ✅ Verify Course ID is correct
- ✅ Check course exists
- ✅ Enter lesson title (required)
- ✅ Check network connection

### Course Title Issues

**Problem:** Cannot see full title
- ✅ Keep titles under 100 characters
- ✅ Use clear, concise language
- ✅ Avoid special characters

### Video URL Not Working

**Problem:** Video doesn't play
- ✅ Verify URL format (include https://)
- ✅ Check video is publicly accessible
- ✅ Try direct video file URLs
- ✅ Test URL in browser first

## Features & Limitations

### What You Can Do

✅ Create unlimited courses
✅ Add unlimited lessons
✅ Edit course details
✅ Delete courses/lessons
✅ View student count
✅ Monitor enrollments
✅ Set course prices

### What You Cannot Do (Yet)

❌ Edit course after creation (coming soon)
❌ Bulk import lessons
❌ Schedule course releases
❌ Send announcements
❌ Grade assignments

## Course Best Practices Template

### Course Structure Example

**Course Title:** "Full Stack Web Development Bootcamp"

**Description:**
```
Learn to build complete web applications from scratch!

What You'll Learn:
- HTML5 & CSS3 fundamentals
- JavaScript ES6+ programming
- React.js framework
- Node.js backend development
- MongoDB database design
- Full stack project development

Course Duration: 8 weeks
Level: Beginner to Intermediate
Prerequisites: Basic computer knowledge

By the end of this course, you'll be able to:
- Build responsive websites
- Create interactive web applications
- Develop backend APIs
- Deploy applications to production
```

### Lesson Structure Example

**Lesson 1: Getting Started with HTML**

```
# Introduction to HTML

HTML (HyperText Markup Language) is the standard markup language 
for creating web pages.

## What is HTML?
HTML provides the structure and content of web pages...

## Basic HTML Structure
```html
<!DOCTYPE html>
<html>
  <head>
    <title>My Page</title>
  </head>
  <body>
    <h1>Welcome!</h1>
  </body>
</html>
```

## Key Tags
- <h1> to <h6>: Headings
- <p>: Paragraphs
- <a>: Links
- <img>: Images

## Next Lesson
In the next lesson, we'll explore CSS styling...

## Resources
- [MDN HTML Guide](https://developer.mozilla.org/en-US/docs/Web/HTML)
- [HTML Best Practices](https://example.com)
```

## FAQ - Frequently Asked Questions

**Q: Can I edit a course after creating it?**
A: Not yet, but we're adding this feature soon. For now, delete and recreate if needed.

**Q: How many lessons can I add?**
A: Unlimited! Add as many as your course needs.

**Q: Can I make my course private?**
A: Currently all courses are public. Private courses coming soon.

**Q: Can students download lessons?**
A: This feature is planned for future releases.

**Q: How do I get paid for my courses?**
A: Payment integration is in development. Coming in next update.

**Q: Can I see which students viewed my lessons?**
A: Student engagement analytics are in development.

**Q: How do I set a course schedule?**
A: Schedule feature coming in future updates.

**Q: Can I add assignments to my course?**
A: Assignments feature coming soon!

## Support & Help

### Getting Help

1. **Check Documentation**
   - Read this guide
   - Check main README.md
   - Review API docs

2. **Troubleshoot**
   - Clear browser cache
   - Restart the application
   - Check MongoDB connection

3. **Report Issues**
   - Document the problem
   - Include screenshots
   - Note error messages
   - Provide reproduction steps

### Contact Support

- Email: support@lms.com
- Report issues on GitHub
- Check FAQ section

## Tips for Success

1. **Plan Your Course**
   - Outline all topics
   - Organize lessons logically
   - Plan lesson sequence

2. **Create Engaging Content**
   - Use clear language
   - Provide examples
   - Include resources
   - Add videos

3. **Stay Organized**
   - Use consistent naming
   - Group related lessons
   - Maintain course quality

4. **Engage Students**
   - Respond to questions
   - Monitor enrollments
   - Keep updating content
   - Encourage feedback

5. **Promote Your Course**
   - Share with networks
   - Get student reviews
   - Update course regularly
   - Build your reputation

---

**Good Luck with Your Teaching Journey! 🎓**

**Remember:** Quality content and consistent updates lead to successful courses and satisfied students!

For more information, see the [main README](./README.md).
