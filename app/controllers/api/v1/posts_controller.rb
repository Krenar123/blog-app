# frozen_string_literal: true

module Api
  module V1
    class PostsController < BaseController
      def index
        records = Post.all

        if records.present?
          render json: records
        else
          render json: { error: 'No posts found' }, status: :not_found
        end
      end

      def show
        record = Post.find(params[:id])

        render json: record
      rescue StandardError
        render json: { error: 'No post found' }, status: :not_found
      end

      def create
        record = Post.new(safe_params)

        if record.save
          render json: record, status: :created
        else
          render json: { errors: record.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def update
        record = Post.find(params[:id])

        if record.update(safe_params)
          render json: record
        else
          render json: { errors: record.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def destroy
        record = Post.find(params[:id])

        if record.destroy
          render json: record
        else
          render json: { errors: record.errors.full_messages }, status: :unprocessable_entity
        end
      end

      private

      def safe_params
        params.permit(
          :content
        )
      end
    end
  end
end
