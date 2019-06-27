import React from 'react'
import styled from 'styled-components'
import Button from './Button'
import CloseIcon from './icons/Close'

const Wrapper = styled.div`
  border: 1px solid #ebeaed;
  border-radius: 5px;
  margin: 18px 0;
  padding: 18px;
  position: relative;

  &.removing {
    opacity: 0.3;
  }

  & .tool-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  & .tool-desc {
    margin: 18px 0 22px;
  }

  &:hover {
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);
  }

  & h3 {
    margin: 0;
    width: 100%;
  }

  & b {
    background: yellow;
  }

  & .tag {
    margin-right: 8px;
    color: #000;
    font-weight: bold;
    font-size: 14px;
    display: inline-block;
  }
`

function replaceBold(s, [a, b], idx) {
  const start = idx === 0 ? a : a + idx * 7
  const end = idx === 0 ? b + 1 : b + idx * 7 + 1

  return (
    s.slice(0, start) + `<b>${s.slice(start, end)}</b>` + s.slice(end, s.length)
  )
}

function transformValues(key, values, matches = []) {
  const match = matches.find((i) => i.key === key)
  const value = values[key]

  if (!match) {
    return value
  }

  return match.indices.reduce(replaceBold, value)
}

function transformTags(tags = [], matches = []) {
  const tagMatches = matches.filter((i) => i.key === 'tags')

  return tagMatches.length
    ? tags.map((tag, idx) => {
        const match = tagMatches.find((i) => i.arrayIndex === idx)

        return match ? match.indices.reduce(replaceBold, tag) : tag
      })
    : tags
}

export default function Tool({
  id,
  link,
  handleRemove,
  removing,
  matches,
  ...props
}) {
  const selfRemoving = removing === id
  const title = transformValues('title', props, matches)
  const description = transformValues('description', props, matches)
  const tags = transformTags(props.tags, matches)

  const Title = <span dangerouslySetInnerHTML={{ __html: title }} />

  return (
    <Wrapper className={selfRemoving && 'removing'}>
      <div className="tool-header">
        <h3>
          {link ? (
            <a
              title={`click to open ${props.title}`}
              target="_blank"
              rel="noopener noreferrer"
              href={link}
            >
              {Title}
            </a>
          ) : (
            Title
          )}
        </h3>
        <Button
          onClick={() => handleRemove({ id, title: props.title })}
          disabled={removing}
        >
          <CloseIcon fill="#365df0" />
          remove
        </Button>
      </div>

      <p
        className="tool-desc"
        dangerouslySetInnerHTML={{ __html: description }}
      />

      {tags.map((tag) => (
        <span
          className="tag"
          key={tag}
          dangerouslySetInnerHTML={{ __html: '#' + tag }}
        />
      ))}
    </Wrapper>
  )
}
