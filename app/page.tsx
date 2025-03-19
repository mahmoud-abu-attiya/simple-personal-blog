'use client';

// import { useState, useEffect } from 'react';
// import InfiniteScroll from 'react-infinite-scroll-component';
// import Masonry from 'react-masonry-css';
// import { Article } from '../types/newsApi';
// import Image from 'next/image';
// import Link from 'next/link';
import TryNewApi from '@/components/TryNewApi';

export default function ArticlesPage() {
  // const [articles, setArticles] = useState<Article[]>([]);
  // const [page, setPage] = useState<number>(1);
  // const [hasMore, setHasMore] = useState<boolean>(true);

  // const fetchArticles = async () => {
  //   const apiKey = process.env.NEXT_PUBLIC_NEWSAPI_KEY;
  //   const url = `https://newsapi.org/v2/everything?q=frontend&apiKey=${apiKey}&page=${page}&pageSize=10`;

  //   try {
  //     const response = await fetch(url);
  //     if (!response.ok) {
  //       console.log(response);
  //       throw new Error('Failed to fetch articles');
  //     }
  //     const data = await response.json();

  //     const newArticles: Article[] = data.articles || [];
  //     setArticles((prev) => [...prev, ...newArticles]);
  //     setPage(page + 1);
  //     if (newArticles.length === 0) {
  //       setHasMore(false);
  //     }
  //   } catch (error) {
  //     console.error('Error fetching articles:', error);
  //     setHasMore(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchArticles(); // Initial fetch
  // }, []);

  // const renderArticle = (article: Article, index: number) => (
  //   <div key={index} className="rounded-xl overflow-hidden shadow-lg border border-blue-300 flex flex-col gap-4 p-4 bg-gradient-to-br from-sky-100 via-sky-200 to-blue-300 backdrop-blur-md">

  //     {article.urlToImage && article.urlToImage.startsWith("http") ? (
  //       <Image src={article.urlToImage} alt={article.title} className="article-image rounded-xl shadow" width={300} height={150} />
  //     ) : (
  //       <Image src={"https://placehold.co/300x150/png"} alt={article.title} className="article-image rounded-xl shadow" width={300} height={150} />
  //     )}
  //       <h2 className='text-xl font-bold text-sky-900'>{article.title}</h2>
  //       <p className='font-light'>{article.description || 'No description available'}</p>
  //       <p>
  //         <small>Published: {new Date(article.publishedAt).toLocaleDateString()}</small>
  //       </p>
  //       <Link href={article.url} target="_blank" rel="noopener noreferrer" className='text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-5 py-2.5 text-center'>
  //         Read More
  //       </Link>
  //   </div>
  // );

  // const Loading = () => (
  //   <div role="status" className='w-fit mx-auto my-4 flex items-center gap-2'>
  //     <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
  //       <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
  //       <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
  //     </svg>
  //     <span className="">Loading...</span>
  //   </div>
  // )

  // // Breakpoints for responsive columns in Masonry Grid
  // const breakpointColumnsObj = {
  //   default: 3, // 3 columns by default
  //   1100: 2, // 2 columns for screens <= 1100px
  //   700: 1, // 1 column for screens <= 700px
  // };

  return (
    <main className="container pt-18">
      <div className="my-8 md:my-16 max-w-2xl text-center mx-auto">
      <h1 className='text-4xl md:text-6xl animated-gradient-text uppercase mb-4'>Dive Into a World of Knowledge</h1>
      <p className="text-sky-900 text-xl">Explore insightful articles on topics that matter. Read, learn, and stay inspired—one article at a time.</p>
      </div>
      <TryNewApi />
        {/* <InfiniteScroll
          dataLength={articles.length}
          next={fetchArticles}
          hasMore={hasMore}
          loader={<Loading />}
          endMessage={<p className='text-xl my-6 text-center'>No more articles to load.</p>}
        >
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {articles.map((article, i) => renderArticle(article, i))}
          </Masonry>
        </InfiniteScroll> */}
    </main>
  );
}