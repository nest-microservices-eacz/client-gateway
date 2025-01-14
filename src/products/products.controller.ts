import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';

@Controller('products')
export class ProductsController {
  constructor() {}

  @Post()
  createProduct() {
    return 'create product';
  }

  @Get()
  findProducts() {
    return 'find products';
  }

  @Get(':id')
  findProductById(@Param('id', ParseIntPipe) id: number) {
    return `get product ${id}`;
  }

  @Patch(':id')
  updateProduct(@Param('id', ParseIntPipe) id: number) {
    return `update product ${id}`;
  }

  @Delete(':id')
  deleteProduct(@Param('id', ParseIntPipe) id: number) {
    return `delete product ${id}`;
  }
}
