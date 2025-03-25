---
date_created: 2025-03-25, 10:11 AM
date_modified: 2025-03-25, 11:03 AM
gists:
  - id: e3906880fb6dca63404e2eacfd12d994
    url: https://gist.github.com/fdsayre/e3906880fb6dca63404e2eacfd12d994
    createdAt: 2025-03-25T18:03:14Z
    updatedAt: 2025-03-25T18:03:14Z
    filename: 2025-03-25-1012 Critical Play with GenAI - Workshop Resources.md
    isPublic: true
    baseUrl: https://api.github.com
title: "Critical Play with GenAI - Workshop Resources"
---

# Critical Play with GenAI: Workshop Resources

## Workshop Overview

Welcome to our hands-on exploration of generative AI through the lens of disciplinary expertise. This page contains all the resources you'll need during today's workshop.

**Shared Document Link:** [March 2025 Critical Play with GenAI: Evaluating AI Through Disciplinary Expertise - Google Docs](https://docs.google.com/document/d/1vSRodxC5gNXoaZjMXNfrgb3sDclW1JUZpE7SveQqlVE/edit?usp=sharing)

## Key Principles for This Workshop

- **AI is most valuable for experts working within their disciplines**
- **Focus on enhancing what you create, not what AI creates independently**
- **Quick iteration is more valuable than perfectionism**
- **Your expertise is essential for evaluating AI outputs**
- **Playful experimentation leads to deeper insights than rigid approaches**

## Workshop Materials

### 1. Initial Workshop Design Prompt

This is the initial prompt we will work with: 

```
I am creating an active learning workshop for university faculty, staff, and students on how to use artificial intelligence, and specifically text generation or GPT models. Attendees might come from across the university, work in teaching, administrative, and/or instructional support roles. Since we can't know ahead of time, the session must start with a roundtable where people introduce themselves and what they do at the university and talk for 1 minute at most about their experience with AI. The learning objectives are: 1. Demonstrate different techniques for prompting GenAI models, including brainstorming and generating content, getting feedback from various perspectives, and transforming content from one format to another. 2.Analyze and explain how different prompting techniques affect AI-generated outputs. 3. Critically evaluate the strengths and limitations of AI models for different types of content and tasks. 4. Critically evaluate the role of expertise in the use of GenAI models, including for prompting and evaluating content. The rest of the session will involve participants using this prompt to build the workshop they are in. It must include activities for each of the techniques in the learning objectives, and discussions of the role of expertise, strengths and limitations for different types of content and tasks. Generate a draft outline of the workshop.
```


### Follow-up Prompt

A version of this prompt will likely be needed:

```

a couple changes. the workshop will have 6 participants and will be 2 hours long. the workshop will involve the group exploring models through the application of their disciplinary expertise and judgement. we will start with a demonstration of this prompt and some tips and strategies, and then as individuals participants will spend 15 minutes taking the promts we are using here and using them to create workshops for their own disciplinary contexts. they will then spend 15 minutes exploring asking models to apply Universal Design for Learning principles to their workshop. They will then have time for a group review before a break. After the break they will explore the role of disciplinary knowledge by swapping their pre-break disciplinary specific prompts with a partner, and working with them for 10 minutes, before spending 10 minutes reflecting with their partner on what they noticed working with AI from a different disciplinary perspective. There will then be 15 minutes for group discussion and relfection and a wrap up.

```

### What Makes This Prompt Effective?

- **Clear Context and Purpose:** Identifies audience, setting, and pedagogical approach
- **Specific Parameters:** Defined constraints, objectives, and available tools
- **Detailed Request:** Specifies exactly what's needed in the response

### But Also Note

- The prompt is not overly formal and isn't always linear 
- Not a lot of worrying about spelling or grammar.
- Very conversational.

## GenAI Prompting Strategies

### Core Principles for Working with AI

#### 1. Be Specific and Unique

- **✓ DO:** Provide rich context, unique examples, and specific details
- **✗ DON'T:** Use vague, generic requests that could apply to anyone

#### 2. Work Within Your Expertise

- **✓ DO:** Apply your disciplinary knowledge to evaluate and refine AI outputs
- **✗ DON'T:** Expect the AI to have expert knowledge in your field

#### 3. Think Like a Director

- **✓ DO:** Give AI a specific role, audience, and purpose
- **✗ DON'T:** Treat AI as a search engine with simple commands

#### 4. Iterate Quickly and Often

- **✓ DO:** Try multiple short prompts rather than perfecting a single one
- **✗ DON'T:** Spend more than 1 minute writing any single prompt
- **✓ DO:** Use each response to inform your next prompt
- **✗ DON'T:** Expect perfect results on the first attempt

#### 5. Be Critical

- **✓ DO:** Carefully evaluate AI outputs based on your expertise
- **✗ DON'T:** Accept AI-generated content without critical assessment

### Effective Techniques to Try

#### Persona-Based Prompting

**Description:** Assign the AI a specific identity or professional role

```
Act as an experienced instructional designer with expertise in 
active learning. Review my lesson plan and suggest improvements 
that would increase student engagement.
```

#### Chain of Thought

**Description:** Ask AI to break down its reasoning step-by-step

```
Analyze the strengths and weaknesses of this research methodology. 
Walk through your analysis step by step, considering validity, 
reliability, and potential biases.
```

#### Contextual Enrichment

**Description:** Provide detailed background to improve relevance

```
I'm designing an undergraduate course for third-year biology 
students who have completed basic genetics but haven't yet 
specialized. Many struggle with connecting molecular processes 
to larger biological systems. With this context in mind, 
suggest three active learning activities for teaching epigenetics.
```

#### Provide Context

**Description:** Give AI context in the form of documents, etc

```
Here are the UDL guidelines. Apply them to this workshop and give me recommended modifications in bullet-point form with examples.

(pasted guidelines)
```

#### Multiple Perspectives

**Description:** Ask AI to consider different viewpoints

```
Evaluate this policy from the perspective of: 1) a first-year 
student, 2) a faculty member with a heavy teaching load, and 
3) an administrator concerned with resource allocation.
```

#### Format Specification

**Description:** Clearly define the desired output format

```
Create a one-page lesson plan with the following sections:
1. Learning objectives (3-4 bullet points)
2. Pre-class preparation (100 words)
3. In-class activities (150 words)
4. Assessment strategy (100 words)
Format everything in markdown with clear headings.
```

#### Dialogue Starter Phrases

Use these to engage in a back-and-forth conversation with AI:

- "I don't think that's quite right because…"
- "Can you explain your reasoning about…"
- "That's interesting, but in my field we would approach this by…"
- "Let me give you more context about my discipline…"
- "That's a good start. Could you specifically address…"

## UDL Integration Guide

### What is Universal Design for Learning (UDL)?

Universal Design for Learning is a framework for designing educational experiences that work for all learners. UDL is based on three core principles:

1. **Multiple Means of Engagement** - The "Why" of Learning
2. **Multiple Means of Representation** - The "What" of Learning
3. **Multiple Means of Action & Expression** - The "How" of Learning

### UDL Enhancement Activity

For this activity, you'll use AI to enhance your existing content using UDL principles. Rather than creating new UDL-aligned materials from scratch, we're focusing on how AI can help improve what you've already developed.

#### Step 1: Request a UDL Evaluation

Ask the AI to evaluate your content using UDL principles. Here's a prompt template you can adapt:

```
I'd like you to evaluate this [lesson/activity/workshop] using Universal Design for Learning (UDL) principles. 

Here's my content:
[Paste your content here]

Please analyze how well this content incorporates:
1. Multiple means of engagement (how it engages diverse learners)
2. Multiple means of representation (how information is presented)
3. Multiple means of action & expression (how learners can demonstrate understanding)

For each principle, identify specific strengths and areas for improvement.
```

#### Step 2: Request UDL-Based Enhancements

Next, ask the AI to suggest specific enhancements to better align your content with UDL principles:

```
Based on your UDL evaluation, please recommend 3-4 specific enhancements that would make this [lesson/activity/workshop] more inclusive and effective for diverse learners. 

For each recommendation:
1. Identify which UDL principle it addresses
2. Explain why this enhancement would be beneficial
3. Provide a concrete example of how to implement it

Focus especially on [engagement/representation/action & expression] as this seems to need the most improvement.
```

### Key UDL Guidelines to Consider

#### Engagement

- Optimize individual choice and autonomy
- Optimize relevance, value, and authenticity
- Minimize threats and distractions
- Foster collaboration and community

#### Representation

- Offer ways of customizing the display of information
- Offer alternatives for auditory and visual information
- Clarify vocabulary and symbols
- Illustrate through multiple media

#### Action & Expression

- Vary methods for response and navigation
- Optimize access to tools and assistive technologies
- Use multiple media for communication
- Build fluencies with graduated levels of support

## Disciplinary Expertise Guide

### Leveraging Your Expertise with GenAI

Your disciplinary knowledge is valuable in:

1. **Crafting better prompts** informed by discipline-specific conventions
2. **Critically evaluating outputs** based on field-specific standards
3. **Identifying disciplinary gaps** in AI-generated content
4. **Refining and adapting AI content** to meet professional standards

### Discipline-Specific Evaluation

#### Step A: Identify Key Principles in Your Discipline

Before engaging with AI, take a moment to identify 3-5 fundamental principles, standards, or practices that define quality work in your field. These might include:

- Field-specific methodologies
- Ethical considerations
- Standards of evidence
- Key theoretical frameworks
- Communication conventions
- Quality criteria

#### Step B: Prompt for Discipline-Specific Analysis

Ask the AI to analyze your content using your disciplinary principles. Here's a template:

```
I'd like you to analyze this [content] from the perspective of a [your discipline] expert. 

Here's my content:
[Paste your content here]

In [your discipline], we evaluate work based on these key principles:
1. [Principle 1]
2. [Principle 2]
3. [Principle 3]
…

Please analyze my content using these principles. For each principle:
1. Assess how well the content aligns with this standard
2. Identify specific strengths and weaknesses
3. Suggest discipline-specific improvements
```

### Cross-Disciplinary Exchange Reflection

As you work with content from another discipline, consider these questions:

1. How does working in an unfamiliar discipline change how you interact with AI?
2. What disciplinary assumptions become visible when working outside your field?
3. How does your own expertise influence how you approach another discipline?
4. What similarities and differences do you notice in how AI handles different disciplines?
5. What can you learn about your own discipline by seeing how another field approaches AI?

## Additional Resources

### Recommended Readings

- Mollick, E., & Mollick, L. (2023). *Co-Intelligence: Living and Working with AI*. Harvard Business Review Press.
- [Your Institution's AI Guidelines/Policies]
- [Other relevant resources]

### AI Tools and Access

- [Instructions for accessing campus-supported AI tools]
- [Information about free vs. paid tiers]
- [Privacy and data considerations]
