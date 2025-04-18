import React, { useState } from 'react';
import styled from 'styled-components';

const HomeContainer = styled.div`
  padding: 2rem;
  background-color: #f5f5f5;
  min-height: 100vh;
`;

const Title = styled.h2`
  color: #1a237e;
  margin-bottom: 2rem;
  text-align: center;
`;

const CardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const Card = styled.div`
  background: white;
  padding: 1.5rem;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s;

  &:hover {
    transform: translateY(-5px);
  }
`;

const CardTitle = styled.h3`
  color: #1a237e;
  margin-bottom: 1rem;
`;

const CardContent = styled.p`
  color: #666;
  line-height: 1.6;
`;

const TipsSection = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-top: 2rem;
`;

const TipItem = styled.div`
  margin-bottom: 1.5rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid #eee;

  &:last-child {
    border-bottom: none;
    margin-bottom: 0;
    padding-bottom: 0;
  }
`;

const Home = () => {
  const [flippedCards, setFlippedCards] = useState({});

  const toggleCard = (id) => {
    setFlippedCards(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const flashcards = [
    {
      id: 1,
      title: 'Medical Loans',
      front: 'What are medical loans?',
      back: 'Medical loans are specialized personal loans designed to cover healthcare expenses, offering lower interest rates and flexible repayment terms compared to credit cards.'
    },
    {
      id: 2,
      title: 'Investment Basics',
      front: 'What is diversification?',
      back: 'Diversification is spreading investments across different assets to reduce risk. The saying "don\'t put all your eggs in one basket" applies here.'
    },
    {
      id: 3,
      title: 'Charity Investing',
      front: 'How does charity-based profit allocation work?',
      back: 'A portion of your investment profits is automatically allocated to charitable causes, allowing you to make a positive impact while growing your wealth.'
    },
    {
      id: 4,
      title: 'Stock Market',
      front: 'What is market sentiment?',
      back: 'Market sentiment refers to the overall attitude of investors toward a particular security or financial market, influencing price movements.'
    }
  ];

  const tips = [
    {
      title: 'Start Early',
      content: 'The earlier you start investing, the more time your money has to grow through compound interest.'
    },
    {
      title: 'Emergency Fund',
      content: 'Always maintain an emergency fund covering 3-6 months of expenses before making significant investments.'
    },
    {
      title: 'Medical Planning',
      content: 'Consider health insurance and medical savings accounts as part of your financial planning strategy.'
    },
    {
      title: 'Regular Review',
      content: 'Review your investment portfolio regularly to ensure it aligns with your goals and risk tolerance.'
    }
  ];

  return (
    <HomeContainer>
      <Title>Financial Education Hub</Title>
      
      <CardGrid>
        {flashcards.map(card => (
          <Card key={card.id} onClick={() => toggleCard(card.id)}>
            <CardTitle>{card.title}</CardTitle>
            <CardContent>
              {flippedCards[card.id] ? card.back : card.front}
            </CardContent>
          </Card>
        ))}
      </CardGrid>

      <TipsSection>
        <Title>Investment Tips</Title>
        {tips.map((tip, index) => (
          <TipItem key={index}>
            <CardTitle>{tip.title}</CardTitle>
            <CardContent>{tip.content}</CardContent>
          </TipItem>
        ))}
      </TipsSection>
    </HomeContainer>
  );
};

export default Home; 