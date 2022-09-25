# frozen_string_literal: true

require 'rails_helper'

RSpec.describe Api::V1::PostsController, type: :controller do
  let!(:user) { build(:user) }
  let!(:post) { build(:post) }
  let!(:comment) { build(:comment, :for_post, commentable: post, user: user) }
  let!(:comment_reply) { build(:comment, :comment_reply, commentable: comment, user: user) }

  describe 'GET index' do
    let(:response_parsed) { JSON.parse(response.body) }

    it 'has a 200 status code' do
      user.save
      post.save
      comment.save

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
      expect(response_parsed.first['id']).to eq(posts.first.id)
    end
  end

  describe 'GET show' do
    let(:response_parsed) { JSON.parse(response.body) }

    it 'has a 200 status code' do
      user.save
      post.save
      comment.save

      get :show, params: { id: '1' }
      expect(response.status).to eq(200)
    end

    it 'responds to json format' do
      get :show, params: { id: '1' }
      expect(response.content_type).to eq 'application/json; charset=utf-8'
    end

    it 'returns error no posts found when there is no post' do
      Post.destroy_all

      get :show, params: { id: '1' }
      expect(response_parsed['error']).to eq('No post found')
    end

    it 'returns post' do
      user.save
      post.save
      comment.save

      check_post = Post.find_by(id: post.id)

      puts check_post.to_json

      get :show, params: { id: post.id }
      expect(response_parsed['content']).to eq(check_post.content)
    end
  end
end
