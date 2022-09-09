import React, { useState } from 'react';
import { Star, StarFill } from 'react-bootstrap-icons';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { landingBackgroundImage } from '../config';

function FeedbackModal({ className, onClose, closeText }) {
  const nStars = 5;
  const [rating, setRating] = useState(-1);
  const [ratingSelected, setRatingSelected] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // generate array of clickable stars for rating
  const stars = Array.from(Array(nStars)).map((_, i) => {
    const handleHover = () => {
      if (!ratingSelected) setRating(i);
    };
    return (
      <button
        // eslint-disable-next-line react/no-array-index-key
        key={i}
        className="star-wrapper"
        type="button"
        onMouseOver={handleHover}
        onFocus={handleHover}
        onClick={() => {
          setRating(i);
          setRatingSelected(true);
        }}
      >
        {
        rating >= i
          ? <StarFill size={64} className="star-fill" fill="#212529" />
          : <Star size={64} className="star-outline" fill="#212529" />
      }
      </button>
    );
  });

  // allow for custom input
  const [customField, setCustomField] = useState('');
  const [customItems, setCustomItems] = useState([]);
  // default tags
  const tagItems = ['Easy', 'Intuitive', 'Slow', 'Helpful', 'Personable', 'Laggy'];
  const [selectedTags, setSelectedTags] = useState([]);
  const handleSelectTag = (t) => {
    const isCustom = customItems.indexOf(t) > -1;
    if (isCustom) {
      const tagIsSelected = customItems.indexOf(t) > -1;
      if (tagIsSelected === false) setSelectedTags([...selectedTags, t]);
      // remove custom tag from array if selected again and set input as value so user can edit
      else {
        setSelectedTags([...selectedTags.filter((v) => v !== t)]);
        setCustomItems([...customItems.filter((v) => v !== t)]);
        setCustomField(t);
      }
    } else {
      const tagIsSelected = selectedTags.indexOf(t) > -1;
      if (tagIsSelected === false) setSelectedTags([...selectedTags, t]);
      else setSelectedTags([...selectedTags.filter((v) => v !== t)]);
    }
  };

  return (
    <div className={className}>
      <div className="feedback-container">
        <div className="row d-flex justify-content-center">
          <div className="tutorial-icon tutorial-icon-dp mb-2" />
        </div>
        {
            submitted
              ? (
                <div>
                  <div className="row text-center">
                    <h2>Thank you for your feedback.</h2>
                    <p>
                      Want to keep chatting? If not, we can end our conversation.
                    </p>
                  </div>
                  <div className="row">
                    <div className="d-flex justify-content-center">
                      <button onClick={onClose} type="button" className="btn btn-dark me-4">{closeText}</button>
                      <Link to="/" className="btn btn-outline-dark" type="button">I&apos;m Done</Link>
                    </div>
                  </div>
                </div>
              )
              : (
                <div>
                  <div className="row">
                    <h2 className="text-center">Can you rate your experience with Digital Persona A?</h2>
                  </div>
                  <div className="row">
                    <div
                      className="justify-content-center d-flex"
                      onMouseLeave={() => {
                        if (!ratingSelected) setRating(-1);
                      }}
                    >
                      {stars}
                    </div>
                  </div>
                  <hr />
                  <div className="row">
                    <h3>How would you describe your experience?</h3>
                    <div>Select all that apply or type your own</div>
                    <div className="mt-3">
                      {/* combine default tags and custom ones to display as one list */}
                      {/* user can click on default tags to deselect and custom ones to edit */}
                      {[...tagItems, ...customItems].map((t) => (
                        <button
                          className={`rating-tag ${selectedTags.indexOf(t) > -1 ? 'rating-tag-selected' : ''}`}
                          type="button"
                          onClick={() => handleSelectTag(t)}
                          key={t}
                        >
                          {t}
                        </button>
                      ))}
                      <form
                        className="d-inline-block"
                        onSubmit={(e) => {
                          e.preventDefault();
                          if (customField !== '') {
                            setCustomItems([...customItems, customField]);
                            handleSelectTag(customField);
                            setCustomField('');
                          }
                        }}
                      >
                        {/* field for custom tags, limited to 20 chars */}
                        <div className="d-flex custom-items">
                          <input
                            type="text"
                            className="form-control me-2"
                            onChange={(e) => {
                              const t = e.target.value;
                              if (t.length < 20) setCustomField(t);
                            }}
                            value={customField}
                          />
                          <button
                            className="btn btn-primary d-inline"
                            disabled={customField === ''}
                            type="submit"
                          >
                            Add
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="row mt-3">
                    <div className="justify-content-end d-flex">
                      <button onClick={onClose} type="button" className="btn btn-outline-dark me-2">No Thanks</button>
                      <button
                        type="button"
                        className="btn btn-dark"
                        disabled={!ratingSelected}
                        onClick={() => setSubmitted(true)}
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              )
          }
      </div>
    </div>
  );
}

export default styled(FeedbackModal)`
  .feedback-container {
  }
  .star-wrapper {
    display: inline;
    margin: 2rem;
    border: none;
    background: #FFF;
  }
  .rating-tag {
    display: inline;
    margin-right: 0.6rem;
    margin-bottom: 0.6rem;
    padding: .5rem;

    font-size: 1.3rem;

    background: #FFF;
    border: 1px solid gray;
    border-radius: 5px;

    max-width: 15rem;

    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;

    &.rating-tag-selected {
      background: #212529;
      color: #FFF;
      &:hover {
        background: #0e1012;
        color: #FFF;
      }
    }
    &:hover {
      background: #DCDCDC;
    }

  }

  .custom-items {
    width: 20rem;

    button, input {
      font-size: 1.3rem;
      padding: .5rem;
    }
    input {
      border: 1px solid gray;
    }
  }

  .tutorial-icon {
    width: 180px;
    aspect-ratio: 1;
    border-radius: 50%;

    display: flex;
    align-items: center;
    justify-content: center;

    background-color: #EAEAEA;
  }
  .tutorial-icon-dp {
    background-image: url(${landingBackgroundImage});
    background-size: cover;
    background-position: bottom center;
  }
`;
