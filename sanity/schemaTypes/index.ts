import { type SchemaTypeDefinition } from 'sanity'

import {blockContentType} from './blockContentType'
import {categoryType} from './categoryType'
import {postType} from './postType'
import {authorType} from './authorType'
import {videoType} from './videoType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [videoType, postType, authorType, categoryType, blockContentType],
}
