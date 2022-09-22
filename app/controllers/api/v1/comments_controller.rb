# frozen_string_literal: true

module Api
  module V1
    class CommentsController < BaseController
      def index
        records = Post.all

        if records.present?
          render json: records
        else
          render json: { error: 'No comments found' }, status: :not_found
        end
      end

      def show
        record = Comment.find(params[:id])

        render json: record
      rescue StandardError
        render json: { error: 'No comment found' }, status: :not_found
      end

      def create
        record = Comment.new(safe_params)

        if record.save
          render json: record, status: :created
        else
          render json: { errors: record.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def update
        record = Comment.find(params[:id])

        if record.update(safe_params)
          render json: record
        else
          render json: { errors: record.errors.full_messages }, status: :unprocessable_entity
        end
      end

      def destroy
        record = Comment.find(params[:id])

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
