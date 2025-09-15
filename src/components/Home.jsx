import React from 'react';
import HeroSection from './HeroSection';
import ListingButtonSection from './ListingButtonSection';
import FilterBar from './FilterBar';
import ListingSection from './ListingSection';
import Categories from './categories';    
import HomeAboutSection from './HomeAboutSection';

const Home = () => {
  return (
    <div className="w-full m-0 p-0 min-h-screen ">
      
      <HeroSection />
      <FilterBar />
      <ListingSection />
      <Categories />
      <ListingButtonSection />
      
      <HomeAboutSection />

    </div>
  );
};

export default Home;
