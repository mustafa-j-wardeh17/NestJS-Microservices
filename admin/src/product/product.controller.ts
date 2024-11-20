import { Body, Controller, Delete, Get, Inject, Param, Patch, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.entity';
import { createProductDto } from './dto/create-product.dto';
import { updateProductDto } from './dto/update-product.dto';
import { ClientProxy } from '@nestjs/microservices';

@Controller('products')
export class ProductController {
    constructor(
        private readonly productServices: ProductService,
        @Inject('PRODUCT_SERVICE') private readonly client: ClientProxy

    ) { }

    //---------------------------------
    //------Get All Products-----------
    //---------------------------------
    @Get()
    async allProducts(): Promise<Product[]> {
        this.client.emit('hello', 'Hello From RabbitMQ')
        return this.productServices.all()
    }

    //---------------------------------
    //--------Create Product-----------
    //---------------------------------
    @Post()
    async createProduct(
        @Body() createProductInput: createProductDto
    ): Promise<Product> {
        const product = await this.productServices.create(createProductInput)
        this.client.emit('product_created', product)
        return product
    }

    //---------------------------------
    //----------Get Product------------
    //---------------------------------
    @Get(':id')
    async getProduct(@Param('id') id: number): Promise<Product> {
        return this.productServices.get(id)
    }


    //---------------------------------
    //---------Update Product----------
    //---------------------------------
    @Patch(':id')
    async updateProduct(
        @Param('id') id: number,
        @Body() updateProductUnput: updateProductDto
    ): Promise<Product> {
        const product = await this.productServices.update(id, updateProductUnput)
        this.client.emit('product_updated', product)
        return product
    }

    //---------------------------------
    //---------Delete Product----------
    //---------------------------------
    @Delete(":id")
    async deleteProduct(@Param('id') id: number) {
        const deletedMessage = this.productServices.deleteOne(id)
        this.client.emit('product_deleted', id)
        return deletedMessage
    }
}
