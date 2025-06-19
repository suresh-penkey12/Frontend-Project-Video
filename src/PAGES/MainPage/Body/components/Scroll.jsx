import React from "react";
import './scroll.css'
const InfiniteScrollCards = () => {
  const cards = [
    { id: 1, title: "Development", content: "Expert guidance in coding" },
    { id: 2, title: "Design", content: "UI/UX best practices" },
    { id: 3, title: "Marketing", content: "Growth strategies" },
    { id: 4, title: "Business", content: "Strategic planning" },
    { id: 5, title: "Data Science", content: "Analytics insights" }
  ];

  return (
    <div className="relative h-[400px] overflow-hidden  p-4" style={{height:"70vh"}}>
      <div className="scroll-container">
        {cards.map((card) => (
          <div
            key={card.id}
            className="rounded-lg  p-6 w-[300px] mx-auto mb-4" style={{width:"28vw",border:"2px solid #ddd", padding:"10px",borderRadius:"20px",backgroundColor:"var(--background-color)"}}
          >
            <h5 className="text-lg font-bold mb-2">{card.title}</h5>
            <p className="text-gray-600">{card.content}</p>
          </div>
        ))}
        {cards.map((card) => (
          <div
            key={`${card.id}-clone`}
            className="rounded-lg  p-6 w-[300px] mx-auto mb-4" style={{width:"28vw",border:"2px solid #ddd", padding:"10px",borderRadius:"20px",backgroundcolor:"var(--background-color)"}}
          >
            <h5 className="text-lg font-bold mb-2">{card.title}</h5>
            <p className="text-gray-600">{card.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfiniteScrollCards;
