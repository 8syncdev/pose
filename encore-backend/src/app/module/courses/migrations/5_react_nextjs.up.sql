-- Insert data into the courses table
INSERT INTO "courses" ("name", "slug", "description", "img_url", "price", "discounted_price", "author_id", "difficulty_level", "duration_hours", "is_published")
VALUES (
  'Khóa học React/Next JS từ cơ bản đến nâng cao',
  'course-nextjs-fullstack',
  'Khóa học cung cấp kiến thức HTML, CSS trong dự án, cách sử dụng responsive, tổng quan về javascript, typescript, xây dựng project Reactjs, hướng dẫn cài đặt như routing, useMemo, useCallback và react memo, sử dụng các thư viện, thực hành làm CRUD với redux, cài đặt và sử dụng react query, thực hiện project cuối khóa (React + NextJS).',
  'https://firebasestorage.googleapis.com/v0/b/nextjs-djninex-store.appspot.com/o/image-upload%2Fnextjs.webp?alt=media&token=dbd81265-44f8-4606-b986-2187bc166c63',
  20000000,
  6500000,
  1,
  'Intermediate',
  150,
  TRUE
);

-- Link the course to the category
INSERT INTO "course_categories" ("course_id", "category_id")
VALUES (
  (SELECT "id" FROM "courses" WHERE "slug" = 'course-nextjs-fullstack'),
  (SELECT "id" FROM "categories" WHERE "slug" = 'foundation')
);

-- Insert chapters
INSERT INTO "chapters" ("course_id", "name", "description", "order", "duration_minutes")
VALUES
  ((SELECT "id" FROM "courses" WHERE "slug" = 'course-nextjs-fullstack'), 'HTML, CSS và JavaScript cơ bản', 'Phần 1: HTML, CSS và JavaScript cơ bản', 1, 1200),
  ((SELECT "id" FROM "courses" WHERE "slug" = 'course-nextjs-fullstack'), 'TypeScript Fundamentals', 'Phần 2: TypeScript Fundamentals', 2, 1200),
  ((SELECT "id" FROM "courses" WHERE "slug" = 'course-nextjs-fullstack'), 'React Fundamentals với TypeScript', 'Phần 3: React Fundamentals với TypeScript', 3, 1440),
  ((SELECT "id" FROM "courses" WHERE "slug" = 'course-nextjs-fullstack'), 'React Ecosystem và Advanced Concepts', 'Phần 4: React Ecosystem và Advanced Concepts', 4, 1680),
  ((SELECT "id" FROM "courses" WHERE "slug" = 'course-nextjs-fullstack'), 'Next.js với TypeScript', 'Phần 5: Next.js với TypeScript', 5, 1680);

-- Insert lessons
INSERT INTO "lessons" ("chapter_id", "name", "description", "order", "content", "duration_minutes", "is_free")
VALUES
  -- Phần 1: HTML, CSS và JavaScript cơ bản
  ((SELECT "id" FROM "chapters" WHERE "name" = 'HTML, CSS và JavaScript cơ bản' LIMIT 1), 'Giới thiệu HTML và cấu trúc cơ bản', 'Bài 1: Giới thiệu HTML và cấu trúc cơ bản', 1, 'Cấu trúc cơ bản của một trang HTML, Các thẻ HTML phổ biến và cách sử dụng, Semantic HTML và tầm quan trọng của nó, Thực hành: Xây dựng một trang web đơn giản', 240, TRUE),
  ((SELECT "id" FROM "chapters" WHERE "name" = 'HTML, CSS và JavaScript cơ bản' LIMIT 1), 'CSS cơ bản và Flexbox', 'Bài 2: CSS cơ bản và Flexbox', 2, 'Cú pháp CSS và cách áp dụng styles, Selectors và specificity, Box model và layout cơ bản, Flexbox: Các thuộc tính và cách sử dụng, Thực hành: Tạo layout responsive với Flexbox', 240, FALSE),
  ((SELECT "id" FROM "chapters" WHERE "name" = 'HTML, CSS và JavaScript cơ bản' LIMIT 1), 'JavaScript cơ bản', 'Bài 3: JavaScript cơ bản', 3, 'Cú pháp JavaScript cơ bản, Biến, kiểu dữ liệu, và phạm vi, Cấu trúc điều khiển: if-else, switch, loops, Functions và arrow functions, DOM manipulation cơ bản, Thực hành: Tạo ứng dụng Todo list đơn giản', 240, FALSE),
  ((SELECT "id" FROM "chapters" WHERE "name" = 'HTML, CSS và JavaScript cơ bản' LIMIT 1), 'ES6+ và Asynchronous JavaScript', 'Bài 4: ES6+ và Asynchronous JavaScript', 4, 'ES6+ features: let/const, destructuring, spread/rest operators, Promises và async/await, Fetch API và AJAX, Error handling, Thực hành: Xây dựng ứng dụng fetch dữ liệu từ API', 240, FALSE),
  ((SELECT "id" FROM "chapters" WHERE "name" = 'HTML, CSS và JavaScript cơ bản' LIMIT 1), 'Responsive Web Design và CSS Grid', 'Bài 5: Responsive Web Design và CSS Grid', 5, 'Nguyên tắc của Responsive Web Design, Media queries và breakpoints, CSS Grid: Các thuộc tính và cách sử dụng, So sánh Flexbox và Grid, Thực hành: Xây dựng layout phức tạp với Grid', 240, FALSE),

  -- Phần 2: TypeScript Fundamentals
  ((SELECT "id" FROM "chapters" WHERE "name" = 'TypeScript Fundamentals' LIMIT 1), 'Giới thiệu TypeScript', 'Bài 6: Giới thiệu TypeScript', 1, 'TypeScript là gì và tại sao sử dụng nó, Cài đặt và cấu hình TypeScript, Kiểu dữ liệu cơ bản trong TypeScript, Type inference và type annotation, Thực hành: Chuyển đổi một project JavaScript sang TypeScript', 240, FALSE),
  ((SELECT "id" FROM "chapters" WHERE "name" = 'TypeScript Fundamentals' LIMIT 1), 'Interfaces và Types', 'Bài 7: Interfaces và Types', 2, 'Interfaces trong TypeScript, Type aliases, Union và Intersection types, Optional và Readonly properties, Thực hành: Xây dựng một hệ thống type cho ứng dụng', 240, FALSE),
  ((SELECT "id" FROM "chapters" WHERE "name" = 'TypeScript Fundamentals' LIMIT 1), 'Functions và Classes trong TypeScript', 'Bài 8: Functions và Classes trong TypeScript', 3, 'Function types và overloading, Classes và access modifiers, Inheritance và implements, Abstract classes và interfaces, Thực hành: Implement một hệ thống OOP với TypeScript', 240, FALSE),
  ((SELECT "id" FROM "chapters" WHERE "name" = 'TypeScript Fundamentals' LIMIT 1), 'Generics và Utility Types', 'Bài 9: Generics và Utility Types', 4, 'Generic functions và classes, Constraints trong generics, Built-in utility types (Partial, Readonly, Pick, etc.), Creating custom utility types, Thực hành: Sử dụng generics để tạo các components tái sử dụng', 240, FALSE),
  ((SELECT "id" FROM "chapters" WHERE "name" = 'TypeScript Fundamentals' LIMIT 1), 'Advanced TypeScript Features', 'Bài 10: Advanced TypeScript Features', 5, 'Conditional types, Mapped types, Decorators trong TypeScript, Module augmentation, Thực hành: Áp dụng advanced features vào một project thực tế', 240, FALSE),

  -- Phần 3: React Fundamentals với TypeScript
  ((SELECT "id" FROM "chapters" WHERE "name" = 'React Fundamentals với TypeScript' LIMIT 1), 'Giới thiệu React với TypeScript', 'Bài 11: Giới thiệu React với TypeScript', 1, 'Cài đặt và cấu hình React với TypeScript, JSX trong TypeScript, Typing components và props, useState và useEffect với TypeScript, Thực hành: Tạo ứng dụng React-TypeScript đầu tiên', 240, FALSE),
  ((SELECT "id" FROM "chapters" WHERE "name" = 'React Fundamentals với TypeScript' LIMIT 1), 'State và Lifecycle trong React-TypeScript', 'Bài 12: State và Lifecycle trong React-TypeScript', 2, 'Typing state trong functional components, useReducer với TypeScript, Custom hooks trong TypeScript, Lifecycle methods trong class components với TypeScript, Thực hành: Xây dựng ứng dụng quản lý state phức tạp', 240, FALSE),
  ((SELECT "id" FROM "chapters" WHERE "name" = 'React Fundamentals với TypeScript' LIMIT 1), 'Event Handling và Forms trong React-TypeScript', 'Bài 13: Event Handling và Forms trong React-TypeScript', 3, 'Typing event handlers, Controlled components với TypeScript, Form validation trong TypeScript, useRef với TypeScript, Thực hành: Xây dựng form phức tạp với validation', 240, FALSE),
  ((SELECT "id" FROM "chapters" WHERE "name" = 'React Fundamentals với TypeScript' LIMIT 1), 'Context API và Higher-Order Components', 'Bài 14: Context API và Higher-Order Components', 4, 'Typing Context trong React, useContext hook với TypeScript, Higher-Order Components (HOCs) trong TypeScript, Render props pattern với TypeScript, Thực hành: Implement global state management với Context API', 240, FALSE),
  ((SELECT "id" FROM "chapters" WHERE "name" = 'React Fundamentals với TypeScript' LIMIT 1), 'React Router với TypeScript', 'Bài 15: React Router với TypeScript', 5, 'Cài đặt và cấu hình React Router với TypeScript, Typing route parameters và query strings, Protected routes trong TypeScript, Code splitting với React.lazy và TypeScript, Thực hành: Xây dựng ứng dụng multi-page với routing', 240, FALSE),
  ((SELECT "id" FROM "chapters" WHERE "name" = 'React Fundamentals với TypeScript' LIMIT 1), 'Testing React Components với TypeScript', 'Bài 16: Testing React Components với TypeScript', 6, 'Jest và React Testing Library với TypeScript, Mocking trong TypeScript tests, Testing hooks và context, Snapshot testing với TypeScript, Thực hành: Viết test suite cho React components', 240, FALSE),

  -- Phần 4: React Ecosystem và Advanced Concepts
  ((SELECT "id" FROM "chapters" WHERE "name" = 'React Ecosystem và Advanced Concepts' LIMIT 1), 'State Management với Redux và TypeScript', 'Bài 17: State Management với Redux và TypeScript', 1, 'Cài đặt Redux với TypeScript, Typing actions, reducers, và store, Redux Toolkit với TypeScript, Async actions với Redux Thunk và TypeScript, Thực hành: Implement Redux trong ứng dụng React-TypeScript', 240, FALSE),
  ((SELECT "id" FROM "chapters" WHERE "name" = 'React Ecosystem và Advanced Concepts' LIMIT 1), 'Styling trong React với TypeScript', 'Bài 18: Styling trong React với TypeScript', 2, 'CSS Modules với TypeScript, Styled-components và TypeScript, Emotion với TypeScript, Tailwind CSS trong React-TypeScript projects, Thực hành: Áp dụng các phương pháp styling khác nhau', 240, FALSE),
  ((SELECT "id" FROM "chapters" WHERE "name" = 'React Ecosystem và Advanced Concepts' LIMIT 1), 'Performance Optimization trong React-TypeScript', 'Bài 19: Performance Optimization trong React-TypeScript', 3, 'useMemo và useCallback với TypeScript, React.memo trong TypeScript, Profiling React-TypeScript apps, Code splitting và lazy loading với TypeScript, Thực hành: Tối ưu hóa performance cho ứng dụng lớn', 240, FALSE),
  ((SELECT "id" FROM "chapters" WHERE "name" = 'React Ecosystem và Advanced Concepts' LIMIT 1), 'Server-Side Rendering với React và TypeScript', 'Bài 20: Server-Side Rendering với React và TypeScript', 4, 'SSR concepts trong TypeScript environment, Setting up SSR với Express và TypeScript, Data fetching trong SSR với TypeScript, Hydration trong TypeScript context, Thực hành: Chuyển đổi ứng dụng React-TypeScript sang SSR', 240, FALSE),
  ((SELECT "id" FROM "chapters" WHERE "name" = 'React Ecosystem và Advanced Concepts' LIMIT 1), 'GraphQL với React và TypeScript', 'Bài 21: GraphQL với React và TypeScript', 5, 'Giới thiệu GraphQL và Apollo Client, Typing GraphQL queries và mutations, Generating TypeScript types từ GraphQL schema, Caching và state management với Apollo Client, Thực hành: Xây dựng ứng dụng React-GraphQL với TypeScript', 240, FALSE),
  ((SELECT "id" FROM "chapters" WHERE "name" = 'React Ecosystem và Advanced Concepts' LIMIT 1), 'Animations trong React với TypeScript', 'Bài 22: Animations trong React với TypeScript', 6, 'CSS transitions và animations trong React, React Transition Group với TypeScript, Framer Motion trong TypeScript environment, GSAP (GreenSock) với React và TypeScript, Thực hành: Thêm animations phức tạp vào ứng dụng', 240, FALSE),
  ((SELECT "id" FROM "chapters" WHERE "name" = 'React Ecosystem và Advanced Concepts' LIMIT 1), 'Accessibility (a11y) trong React-TypeScript', 'Bài 23: Accessibility (a11y) trong React-TypeScript', 7, 'ARIA attributes và roles trong TypeScript, Keyboard navigation với TypeScript, Creating accessible forms, Testing accessibility trong React-TypeScript apps, Thực hành: Audit và cải thiện accessibility cho ứng dụng', 240, FALSE),

  -- Phần 5: Next.js với TypeScript
  ((SELECT "id" FROM "chapters" WHERE "name" = 'Next.js với TypeScript' LIMIT 1), 'Giới thiệu Next.js với TypeScript', 'Bài 24: Giới thiệu Next.js với TypeScript', 1, 'Cài đặt và cấu hình Next.js với TypeScript, Pages và routing trong Next.js-TypeScript, getStaticProps và getServerSideProps với TypeScript, Custom App và Document trong TypeScript, Thực hành: Tạo ứng dụng Next.js-TypeScript đầu tiên', 240, FALSE),
  ((SELECT "id" FROM "chapters" WHERE "name" = 'Next.js với TypeScript' LIMIT 1), 'Data Fetching trong Next.js với TypeScript', 'Bài 25: Data Fetching trong Next.js với TypeScript', 2, 'Typing getStaticProps và getStaticPaths, Incremental Static Regeneration với TypeScript, SWR hook trong TypeScript environment, API Routes với TypeScript, Thực hành: Xây dựng blog với Next.js, TypeScript và Markdown', 240, FALSE),
  ((SELECT "id" FROM "chapters" WHERE "name" = 'Next.js với TypeScript' LIMIT 1), 'Styling và Optimization trong Next.js-TypeScript', 'Bài 26: Styling và Optimization trong Next.js-TypeScript', 3, 'CSS Modules và Sass trong Next.js-TypeScript, Styled JSX với TypeScript, Image Optimization với next/image và TypeScript, Font Optimization trong TypeScript context, Thực hành: Tối ưu hóa assets trong ứng dụng Next.js-TypeScript', 240, FALSE),
  ((SELECT "id" FROM "chapters" WHERE "name" = 'Next.js với TypeScript' LIMIT 1), 'Authentication trong Next.js với TypeScript', 'Bài 27: Authentication trong Next.js với TypeScript', 4, 'Implementing NextAuth.js với TypeScript, Typing custom authentication logic, Protecting API routes trong TypeScript environment, Server-side authentication checks với TypeScript, Thực hành: Xây dựng hệ thống authentication hoàn chỉnh', 240, FALSE),
  ((SELECT "id" FROM "chapters" WHERE "name" = 'Next.js với TypeScript' LIMIT 1), 'Internationalization (i18n) trong Next.js-TypeScript', 'Bài 28: Internationalization (i18n) trong Next.js-TypeScript', 5, 'Cấu hình i18n trong Next.js với TypeScript, Typing translated content, Dynamic routes với multiple languages, Server-side language detection trong TypeScript, Thực hành: Thêm hỗ trợ đa ngôn ngữ cho ứng dụng', 240, FALSE),
  ((SELECT "id" FROM "chapters" WHERE "name" = 'Next.js với TypeScript' LIMIT 1), 'Testing Next.js Applications với TypeScript', 'Bài 29: Testing Next.js Applications với TypeScript', 6, 'Unit testing với Jest và React Testing Library trong TypeScript, Integration tests cho API routes với TypeScript, End-to-end testing với Cypress và TypeScript, Mocking trong Next.js-TypeScript tests, Thực hành: Viết test suite toàn diện cho ứng dụng Next.js-TypeScript', 240, FALSE),
  ((SELECT "id" FROM "chapters" WHERE "name" = 'Next.js với TypeScript' LIMIT 1), 'Deployment và Performance Optimization', 'Bài 30: Deployment và Performance Optimization', 7, 'Deploying Next.js-TypeScript apps to Vercel, Cấu hình CI/CD cho Next.js-TypeScript projects, Performance auditing với TypeScript, Implementing PWA features trong Next.js-TypeScript, Thực hành: Deploy và tối ưu hóa ứng dụng production-ready', 240, FALSE);

-- Insert a voucher for the course
INSERT INTO "vouchers" ("code", "discount", "discount_type", "max_uses", "expiration_date", "course_id")
VALUES ('NEXTJS2023', 20.00, 'Percentage', 100, '2023-12-31 23:59:59', (SELECT "id" FROM "courses" WHERE "slug" = 'course-nextjs-fullstack'));
