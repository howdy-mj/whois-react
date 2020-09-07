import React from 'react';
import { Timeline, Space, Tag, Typography } from 'antd';
import { Link } from 'react-router-dom';
import { diffWords } from 'diff';

/**
 *
 * @param {object} param
 * @param {object[]} param.items
 */
export default function History({ items }) {
  return (
    <Timeline>
      {items.map((item) => (
        <Timeline.Item key={item.id}>
          <Space direction="vertical">
            <Space style={{ flexWrap: 'wrap' }}>
              <Tag>
                <Link to={`/user/${item.editor}`}>
                  수정한 사람: {item.editor}
                </Link>
              </Tag>
              <Tag>
                <Link to={`/user/${item.name}`}>수정된 사람: {item.name}</Link>
              </Tag>
              <Tag>날짜: {item.date}</Tag>
              <Tag>속성: {COLUMN_MAP[item.column]}</Tag>
            </Space>
            <Space>
              {getDiff(item).map((diff, index) => (
                <Typography.Text
                  key={index}
                  delete={diff.removed}
                  style={{
                    color: diff.added ? 'blue' : diff.removed ? 'red' : 'grey',
                  }}
                >
                  {diff.value}
                </Typography.Text>
              ))}
            </Space>
          </Space>
        </Timeline.Item>
      ))}
    </Timeline>
  );
}

const COLUMN_MAP = {
  tag: '태그',
  department: '소속',
};

/**
 * @param {object} param
 * @param {'tag' | 'department'} param.column
 * @param {string} param.before
 * @param {string} param.after
 * @returns {Array<{value: string, removed?: boolean, added?: boolean}>}
 */
function getDiff({ column, before, after }) {
  if (column === 'tag') {
    const tags1 = before.split(',').map((item) => item.trim()); // 배열로
    const tags2 = after.split(',').map((item) => item.trim()); // 배열로
    if (tags1.length > tags2.length) {
      // 어떤게 삭제되었는지
      const tag = tags1.find((item) => !tags2.includes(item));
      if (tag) {
        return [{ value: tag, removed: true }];
      }
    } else if (tags1.length < tags2.length) {
      // 어떤게 추가되었는지
      const tag = tags2.find((item) => !tags1.includes(item));
      if (tag) {
        return [{ value: tag, added: true }];
      }
    }
  }
  // department가 수정되었을 경우
  return diffWords(before, after);
}
