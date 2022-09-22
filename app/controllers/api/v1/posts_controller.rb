# frozen_string_literal: true

module Api
  module V1
    class PostsController < BaseController
      def index
        @posts = Post.all

        if @posts.present?
          render json: @posts
        else
          render json: { error: 'No posts found' }, status: :not_found
        end
      end

      def show
        @post = Post.find(params[:id])

        render json: @post
      rescue StandardError
        render json: { error: 'No post found' }, status: :not_found
      end
    end
  end
end
