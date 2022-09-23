# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::V1::PostsController, type: :controller do
  let!(:user) { build(:user) }
  let!(:post) { build(:post) }
  let!(:comment) { build(:comment, commentable: post, user:) }

  describe 'GET index' do
    it 'has a 200 status code' do
      get :index
      expect(response.status).to eq(200)
    end

    it 'responds to json format' do
      get :index
      expect(response.content_type).to eq 'application/json; charset=utf-8'
    end

    it 'returns error no posts found when there is no post' do
      Post.destroy_all

      get :index
      expect(response.body).to eq('{"error":"No posts found"}')
    end

    it 'returns post' do
      user.save
      post.save
      comment.save

      posts = Post.all

      get :index
      expect(response.parsed_body.to_json).to include(posts.to_json)
    end
  end

  describe 'GET show' do
    it 'has a 200 status code' do
      get :show, params: { id: '1' }
      expect(response.status).to eq(200)
    end

    it 'responds to json format' do
      get :show, params: { id: '1' }
      expect(response.content_type).to eq 'application/json; charset=utf-8'
    end

    it 'returns error no posts found when there is no post' do
      get :show, params: { id: '1' }
      expect(response.body).to eq('{"error":"No post found"}')
    end

    it 'returns post' do
      user.save
      post.save
      comment.save

      check_post = Post.find_by(id: post.id)

      get :show, params: { id: post.id }
      expect(response.parsed_body.to_json).to include(check_post.to_json)
    end
  end
end
