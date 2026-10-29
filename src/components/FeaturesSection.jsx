import React from 'react';
import { Brain, Cpu, Code2, Compass } from 'lucide-react';

export default function FeaturesSection() {
  const features = [
    {
      icon: Brain,
      title: 'AI Fundamentals',
      description: 'Understand how AI can solve real-world problems and discover core Generative AI concepts simply.',
      tag: 'Core Concept'
    },
    {
      icon: Code2,
      title: 'Build an AI Project',
      description: 'Follow a practical, beginner-friendly project-building experience step-by-step from scratch.',
      tag: 'Practical'
    },
    {
      icon: Cpu,
      title: 'Learn by Doing',
      description: 'Explore how AI tools and APIs can help you build useful, functional software applications.',
      tag: 'Hands-on'
    },
    {
      icon: Compass,
      title: 'Start Your AI Journey',
      description: 'Gain practical exposure to AI project development to strengthen your engineering foundation.',
      tag: 'Next Steps'
    },
  ];

  return (
    <section id="what-you-build" style={{
      padding: '50px 24px 60px 24px',
      maxWidth: '1200px',
      margin: '0 auto',
    }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <span className="neumorphic-badge badge-demo" style={{ marginBottom: '10px' }}>
          Workshop Curriculum
        </span>
        <h2 style={{
          fontSize: '2.2rem',
          fontWeight: 800,
          color: 'var(--text-primary)',
          letterSpacing: '-0.02em',
          marginBottom: '12px',
        }}>
          What You'll Learn & Build
        </h2>
        <p style={{
          fontSize: '1rem',
          color: 'var(--text-secondary)',
          maxWidth: '620px',
          margin: '0 auto',
        }}>
          A structured 60-minute practical session designed to take engineering students from curious beginners to builders.
        </p>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '24px',
      }}>
        {features.map((feat, idx) => {
          const Icon = feat.icon;
          return (
            <div 
              key={idx} 
              className="neumorphic-card neumorphic-card-interactive" 
              style={{
                padding: '28px 24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '20px',
                }}>
                  <div className="neumorphic-icon-plate" style={{ width: '48px', height: '48px', borderRadius: '14px' }}>
                    <Icon size={24} color="var(--primary-dark)" strokeWidth={2.2} />
                  </div>
                  <span className="neumorphic-badge badge-info" style={{ fontSize: '0.68rem', padding: '3px 8px' }}>
                    {feat.tag}
                  </span>
                </div>

                <h3 style={{
                  fontSize: '1.2rem',
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  marginBottom: '10px',
                }}>
                  {feat.title}
                </h3>

                <p style={{
                  fontSize: '0.88rem',
                  color: 'var(--text-secondary)',
                  lineHeight: 1.5,
                }}>
                  {feat.description}
                </p>
              </div>

              <div style={{
                marginTop: '20px',
                paddingTop: '16px',
                borderTop: '1px solid rgba(255, 255, 255, 0.5)',
                fontSize: '0.76rem',
                color: 'var(--primary-dark)',
                fontWeight: 700,
              }}>
                Module 0{idx + 1}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

