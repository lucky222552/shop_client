/* 
    利用mockjs提供mock接口
*/
import Mock from 'mockjs'
import floors from './floors.json'
import recommends from './recommends.json'
import banners from './banners.json'

Mock.mock('/mock/floors', { code: 200, data: floors })
Mock.mock('/mock/recommends', { code: 200, data: recommends })
Mock.mock('/mock/banners', { code: 200, data: banners })

console.log('mockServer');