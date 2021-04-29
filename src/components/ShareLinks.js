import React from 'react';
import styled from 'styled-components';

const ShareLinksDiv = styled.div`
  ul {
    align-items: center;
    display: flex;
    font-size: 18px;
    height: 20px;
    justify-content: center;
    overflow: hidden;
    text-align: center;
  }
  a {
    align-items: center;
    color: #b1b1b1;
    display: flex;
    /* transition: all 0.1s; */
  }
  .sharer__label {
    font-size: 12px;
    margin-left: 8px;
  }
`;

function ShareLinks({ url, text }) {
  return (
    <ShareLinksDiv>
      <ul>
        <li>
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${url}`}
            target='_blank'
            rel='noopener noreferrer nofollow'
          >
            <div>
              <svg
                width='16'
                height='16'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 16 16'
                aria-hidden='true'
              >
                <path
                  data-duotone='contrast'
                  fill='none'
                  d='M5 2h9v14H5V2z'
                ></path>
                <path d='M14.07 0H1.92C.86 0 0 .86 0 1.92v12.15C0 15.13.86 16 1.92 16h6.5v-6H6.4V7.66h2V5.94c0-2 1.23-3.1 3.02-3.1.85 0 1.6.07 1.8.1v2.1h-1.24c-.97 0-1.15.45-1.15 1.13v1.5h2.3l-.3 2.33h-2v6h3.24c1.06 0 1.92-.87 1.92-1.93V1.92C16 .86 15.1 0 14.02 0z'></path>
              </svg>
            </div>
            <div className='sharer__label'>Share</div>
          </a>
        </li>
        <li>
          <a
            href={`https://twitter.com/intent/tweet?text=${text}%20https%3A%2F%2F${url}%2F`}
            target='_blank'
            rel='noreferrer noopener nofollow'
          >
            <div>
              <svg
                id='twitter'
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 26 20'
                enable-background='new 0 0 26 20'
                aria-hidden='true'
              >
                <path
                  fill-rule='evenodd'
                  clip-rule='evenodd'
                  d='M17.408.198c1.945-.034 2.979.665 3.967 1.554.84-.07 1.93-.533 2.572-.855l.625-.337c-.367.978-.865 1.744-1.629 2.326-.17.128-.338.304-.551.385v.013c1.09-.011 1.986-.496 2.84-.759v.012c-.447.703-1.055 1.417-1.701 1.929l-.783.614c.014 1.139-.018 2.226-.232 3.182-1.254 5.563-4.576 9.339-9.833 10.958-1.889.58-4.939.818-7.103.289-1.072-.264-2.042-.561-2.951-.953-.505-.217-.973-.453-1.42-.723l-.441-.266c.488.014 1.059.146 1.604.061.493-.078.978-.059 1.433-.156 1.135-.246 2.144-.572 3.012-1.074.422-.242 1.061-.527 1.359-.879-.563.01-1.075-.119-1.494-.266-1.623-.566-2.568-1.607-3.184-3.17.492.053 1.909.18 2.241-.096-.619-.033-1.215-.389-1.641-.65-1.307-.809-2.372-2.161-2.363-4.244l.514.241c.328.137.662.21 1.054.289.165.034.496.13.686.061h-.024c-.254-.292-.666-.485-.92-.797-.838-1.029-1.623-2.612-1.126-4.495.126-.479.325-.901.538-1.29l.025.012c.097.202.314.35.453.519.428.523.955.995 1.493 1.41 1.833 1.415 3.483 2.285 6.135 2.929.673.164 1.45.288 2.253.289-.225-.648-.152-1.698.025-2.326.445-1.578 1.416-2.717 2.84-3.326.34-.146.719-.252 1.115-.338l.612-.073z'
                ></path>
              </svg>
            </div>
            <div className='sharer__label'>Tweet</div>
          </a>
        </li>
        {/* <li>
            <a href="https://www.linkedin.com/shareArticle?mini=true&amp;url=${url}%2F" target="_blank" >
            <div>
            <svg id="linkedin" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" enable-background="new 0 0 16 16" aria-hidden="true"><path d="M.818 5.542h3.08v9.778h-3.08v-9.778zm1.54-4.861c.984 0 1.784.79 1.784 1.763s-.8 1.762-1.784 1.762c-.987 0-1.786-.79-1.786-1.763s.798-1.762 1.786-1.762"></path><path d="M5.829 5.542h2.952v1.336h.041c.41-.768 1.416-1.579 2.914-1.579 3.115 0 3.691 2.024 3.691 4.658v5.362h-3.077v-4.755c0-1.135-.02-2.593-1.6-2.593-1.602 0-1.846 1.235-1.846 2.512v4.836h-3.075v-9.777z"></path></svg>
            </div>
            <div class="sharer__label">
            Share
            </div>
            </a>
            </li> */}
      </ul>
    </ShareLinksDiv>
  );
}

export default ShareLinks;
