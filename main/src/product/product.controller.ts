import { Controller, Get, NotFoundException, Param, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { EventPattern } from '@nestjs/microservices';
import { HttpService } from '@nestjs/axios';

@Controller('products')
export class ProductController {
    constructor(
        private readonly productService: ProductService,
        private readonly httpService: HttpService,
    ) { }

    @Get()
    async getProducts() {
        return this.productService.all()
    }

    @Post(':id/like')
    async like(@Param('id') id: number) {
        const product = await this.productService.get(id)
        if (!product) {
            throw new NotFoundException(`Product with id=${id} not found`);
        }

        this.httpService
        .post(`http://localhost:8000/api/products/${id}/like`, {})
        .subscribe(res => {
            console.log(res)
        })
        return this.productService.update({
            id: product.id,
            likes: product.likes + 1, // Increment likes explicitly
        })
    }

    @EventPattern('getProduct')
    async getProduct(id: number) {
        return this.productService.get(id)
    }

    @EventPattern('product_created')
    async createdProduct(product) {
        await this.productService.create({
            id: product.id,
            likes: product.likes,
            title: product.title,
            image: product.image,
        })
    }

    @EventPattern('product_updated')
    async updatedProduct(product) {
        await this.productService.update({
            id: product.id,
            likes: product.likes,
            title: product.title,
            image: product.image,
        })
    }
    @EventPattern('product_deleted')
    async deletedProduct(id: number) {
        await this.productService.delete(id)
    }


}
