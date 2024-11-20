import { Controller, Get, Param } from '@nestjs/common';
import { ProductService } from './product.service';
import { EventPattern } from '@nestjs/microservices';

@Controller('product')
export class ProductController {
    constructor(private readonly productService: ProductService) { }
    @EventPattern('hello') // recive data from different mmicroservices
    async hello(data: string) {
        console.log(data)
    }
    @Get()
    async getProducts() {
        return this.productService.all()
    }

    @Get(":id")
    async getProduct(@Param('id') id: number) {
        return this.productService.get(id)
    }


}
