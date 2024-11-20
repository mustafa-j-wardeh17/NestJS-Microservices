import { Controller, Get, Param } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Get()
    async getProducts() {
        return this.productService.all()
    }

    @Get(":id")
    async getProduct(@Param('id') id: number) {
        return this.productService.get(id)
    }
}
