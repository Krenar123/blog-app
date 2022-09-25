# frozen_string_literal: true

module Api
  module V1
    class PostsController < BaseController
      before_action :get_post, only: [:show, :update, :destroy]

      def index
        records = Post.all

        if records.present?
          render json: records
        else
          render json: { error: 'No posts found' }, status: :not_found
        end
      end

      def show
        render json: @record
      end

      def create
        puts safe_params
        record = Post.new(safe_params)

        if record.save
          render json: record, status: :created
        else
          render json: { errors: record.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def update
        @record.update(safe_params)

        render json: @record
      end

      def destroy
        @record.destroy
        
        head(:no_content)
      end

      private

      def get_post
        @record = Post.find(params[:id])
      rescue StandardError
        render json: { error: 'No post found' }, status: :not_found
      end

      def safe_params
        params.permit(
          :user_id,
          :content
        )
      end
    end
  end
end
